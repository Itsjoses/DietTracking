import { axiosHttpRequest } from "../libs/api";
import { getTokenFromLocalCookie } from "../libs/auth";

export const apiFood = async () => {
  const jwtLocal = getTokenFromLocalCookie();
  try {
    const responseData = await axiosHttpRequest({
      endpoint: `food/findfood`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtLocal}`,
      },
      method: "Get",
    });
    return responseData.data;
  } catch (error) {
    throw error;
  }
};

export const searchFood = async (data:{
  food_name: string
}) => {
  const jwtLocal = getTokenFromLocalCookie();
  try {
    const responseData = await axiosHttpRequest({
      endpoint: `food/searchfood`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtLocal}`,
      },
      body:{
        food_name: data.food_name
      },
      method: "POST",
    });
    return responseData.data;
  } catch (error) {
    throw error;
  }
};

export const apiCreateFood = async (data: {
  food_name: string;
  description: string;
  calories: number;
}) => {
  const jwtLocal = getTokenFromLocalCookie();
  try {
    const responseData = await axiosHttpRequest({
      endpoint: `food/createfood`,
      body: {
        food_name: data.food_name,
        description: data.description,
        calories: data.calories,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtLocal}`,
      },
      method: "POST",
    });
    return responseData;
  } catch (error) {
    throw error;
  }
};

export const apiDeleteFood = async (food_id: number) => {
  const jwtLocal = getTokenFromLocalCookie();
  try {
    const responseData = await axiosHttpRequest({
      endpoint: `food/deletefood/${food_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtLocal}`,
      },
      method: "DELETE",
    });
    return responseData;
  } catch (error) {
    throw error;
  }
};

export const apiDeleteDietFood = async (diet_food_id: number) => {
  const jwtLocal = getTokenFromLocalCookie();
  try {
    const responseData = await axiosHttpRequest({
      endpoint: `food/deletedietfood/${diet_food_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtLocal}`,
      },
      method: "DELETE",
    });
    return responseData;
  } catch (error) {
    throw error;
  }
};



export const apiCreateDietDiary = async (data: {
  food_id: number;
  category: number;
}) => {
  const jwtLocal = getTokenFromLocalCookie();
  try {
    const responseData = await axiosHttpRequest({
      endpoint: `food/createdietdiary`,
      body: {
        food_id: data.food_id,
        category: data.category,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtLocal}`,
      },
      method: "POST",
    });
    return responseData;
  } catch (error) {
    throw error;
  }
};


export const apiViewAllDietDiary = async () => {
  const jwtLocal = getTokenFromLocalCookie();
  try {
    const responseData = await axiosHttpRequest({
      endpoint: `food/viewdietdiary`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtLocal}`,
      },
      method: "GET",
    });
    return responseData;
  } catch (error) {
    throw error;
  }
};

export const apiViewHistoryDiet = async (data: {category_id: number}) => {
  const jwtLocal = getTokenFromLocalCookie();
  
  try {
    const responseData = await axiosHttpRequest({
      endpoint: `food/viewHistory`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtLocal}`,
      },
      body: {
        category_id: data.category_id,
      },
      method: "POST",
    });
    return responseData;
  } catch (error) {
    throw error;
  }
};