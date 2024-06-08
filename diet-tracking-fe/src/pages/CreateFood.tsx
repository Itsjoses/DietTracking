import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/layouts/Header";
import { apiCreateFood } from "../api/food";
export default function CreateFood() {
    const navigate = useNavigate();
  const [data, setData] = useState<{ food_name: string; description: string, calories: number }>({
    food_name: "",
    description: "",
    calories: 0,
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    e.preventDefault()
    setData((prevData) => ({
        ...prevData,
        [name]: name === "calories" ? parseFloat(value)
            : value,
      }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const responseData: any = await apiCreateFood(data)
    console.log(responseData);
    
    navigate('/foods');
  };

  return (
    <div className="h-screen max-w-screen">
        <Header menu=""/>
      <div className=" w-full flex justify-center items-center pt-20">
        <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-5/12 xl:w-3/12 flex flex-col gap-6">
          <p className="text-5xl tracking-widest mb-8">Create Food</p>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div>
              <p>Food Name</p>
              <input
                type="text"
                className="py-3 px-4 w-full rounded-md border border-custom-color"
                placeholder="E.g. Ayam Goreng"
                name="food_name"
                onChange={handleChange}
              />
            </div>
            <div>
              <p>Description</p>
              <input
                type="text"
                className="py-3 px-4 w-full rounded-md border border-custom-color"
                placeholder="120 gr, dada only"
                name="description"
                onChange={handleChange}
              />
            </div>
            <div>
              <p>Calories</p>
              <input
                type="number"
                className="py-3 px-4 w-full rounded-md border border-custom-color"
                placeholder="120 gr, dada only"
                name="calories"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-custom-color text-white py-3 rounded-md mt-5"
            >
              Create Food
            </button>
          </form>
          
        </div>
      </div>
    </div>

  );
}
