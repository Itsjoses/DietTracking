import { axiosHttpRequest } from "../libs/api";
import { getTokenFromLocalCookie } from "../libs/auth";

export const apiLogin = async (data: { email: string; password: string }) => {
  try {
    const responseData = await axiosHttpRequest({
      endpoint: `auth/signin`,
      body: {
        email: data.email,
        password: data.password,
      },
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    return responseData;
  } catch (error) {
    throw error;
  }
};

export const apiRegister = async (data: {
  username: string;
  email: string;
  password: string;
  dob: string;
  tall: number;
  weight: number;
  gender: string;
  plan: number;
}) => {
  try {
    const responseData = await axiosHttpRequest({
      endpoint: `auth/signup`,
      body: {
        username: data.username,
        email: data.email,
        password: data.password,
        dob: data.dob,
        tall: data.tall,
        weight: data.weight,
        gender: data.gender,
        plan: data.plan,
      },
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    return responseData;
  } catch (error) {
    throw error;
  }
};

export const apiCheckUsername = async () => {
  const jwtLocal = getTokenFromLocalCookie();
  try {
    const responseData = await axiosHttpRequest({
      endpoint: `auth/me`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtLocal}`,
      },
      method: "GET",
    });
    return responseData.data.username;
  } catch (error) {
    throw error;
  }
};

export const apiGetProfile = async () => {
  const jwtLocal = getTokenFromLocalCookie();
  try {
    const responseData = await axiosHttpRequest({
      endpoint: `auth/profile`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtLocal}`,
      },
      method: "GET",
    });
    return responseData.data;
  } catch (error) {
    throw error;
  }
};

export const apiSetProfile = async (data: {
  username: string;
  email: string;
  dob: string;
}) => {
  const jwtLocal = getTokenFromLocalCookie();
  try {
    const responseData = await axiosHttpRequest({
      endpoint: `auth/changeprofile`,
      body: {
        username: data.username,
        email: data.email,
        dob: data.dob,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtLocal}`,
      },
      method: "POST",
    });
    return responseData.data;
  } catch (error) {
    throw error;
  }
};

export const apiSetBmi = async (data: {
  tall: number;
  weight: number;
  plan: number;
}) => {
  const jwtLocal = getTokenFromLocalCookie();
  try {
    const responseData = await axiosHttpRequest({
      endpoint: `auth/changebmi`,
      body: {
        tall: data.tall,
        weight: data.weight,
        plan: data.plan,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtLocal}`,
      },
      method: "POST",
    });
    return responseData.data;
  } catch (error) {
    throw error;
  }
};