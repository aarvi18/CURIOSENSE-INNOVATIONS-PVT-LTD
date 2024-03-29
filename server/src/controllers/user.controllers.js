import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { PhysicalGameReg } from "../models/physicalGameReg.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken;
    const refreshToken = user.generateRefreshToken;

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // Get user details from frontend
  // Validation - not empty
  // Check if user already exists: username, email
  // Check for images, check for avatar
  // Upload them to cloudinary, avatar
  // Create user object - create entry in db
  // Remove password and refresh token field from response
  // Check for user creation
  // Return response

  const {
    userName,
    password,
    email,
    phoneNumber,
    employeeId,
    creatorName,
    profession,
    biography,
  } = req.body;

  if (
    [
      userName,
      password,
      email,
      phoneNumber,
      employeeId,
      creatorName,
      profession,
      biography,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username all ready exist");
  }

  const user = await User.create({
    userName,
    password,
    email,
    phoneNumber,
    employeeId,
    creatorName,
    profession,
    biography,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const physicalGameReg = asyncHandler(async (req, res) => {
  const {
    gametitle,
    age,
    gender,
    category,
    subcategory,
    howtoplay,
    benefitsofplaying,
    itemsrequied,
    url,
    score,
    level,
  } = req.body;

  if (
    [
      gametitle,
      age,
      gender,
      category,
      subcategory,
      howtoplay,
      benefitsofplaying,
      itemsrequied,
      url,
      score,
      level,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedGame = await User.findOne({
    $or: [{ gametitle }],
  });

  if (existedGame) {
    throw new ApiError(409, "User with Game all ready exist");
  }

  const physicalGameReg = await PhysicalGameReg.create({
    gametitle,
    age,
    gender,
    category,
    subcategory,
    howtoplay,
    benefitsofplaying,
    itemsrequied,
    url,
    score,
    level,
  });


  return res
    .status(201)
    .json(new ApiResponse(200, "Game registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // req body -> data
  // acces on the basis of {username , email or password}
  // find the user email
  // check password
  // access and referesh token
  // send cookies

  const { email, userName, password } = req.body;
  if (!(userName || email)) {
    throw new ApiError(400, "Username or password is required");
  }

  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User LoggedIn Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  // Find user
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  physicalGameReg,
};
