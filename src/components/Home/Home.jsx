import { useEffect } from "react";
import { useState } from "react";
import Cart from "../Cart/Cart";
import Swal from 'sweetalert2';

const Home = () => {
  const [data, setData] = useState([]);

  const [selectedActors, setSelectedActors] = useState([]);

  const [remaining, setRemaining] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `data.json`;
        const response = await fetch(URL);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSelect = (actor) => {
    const isExist = selectedActors.find((item) => item.id === actor.id);

    let salaryCount = actor.salary;

    if (isExist) {
      // return alert("Already Added");
      Swal.fire({
        title: 'Oops...',
        text: 'Already Added!',
        icon: 'error',
        confirmButtonText: 'ok'
      })
    } else {
      selectedActors.forEach((item) => {
        salaryCount = salaryCount + item.salary;
      });

      const remainingSalary = 20000 - salaryCount;

      if (salaryCount > 20000) {
        return alert("Taka ses");
      } else {
        setRemaining(remainingSalary);

        setTotalCost(salaryCount);
        const newActor = [...selectedActors, actor];
        setSelectedActors(newActor);
      }
    }
  };

  return (
    <div className="flex flex-wrap justify-between flex-col md:flex-row w-full">
      <div className="w-full lg:w-2/3">
        <h1 className="text-3xl font-bold text-white">Conceptual Session - 2</h1>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-3">
          {data &&
            data?.map((actor, index) => (
              <div
                key={index}
                className="card w-[350px]  my-10 border-2 border-solid m-auto border-red-600 rounded-lg"
              >
                <img
                  className="w-[200px] rounded-full m-auto"
                  src={actor.image}
                  alt=""
                />
                <h3 className="text-white text-2xl">{actor.name}</h3>
                <p className="text-white text-sm">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Excepturi, eveniet.
                </p>
                <div className="flex justify-between">
                  <h4 className="text-white text-sm">
                    Salary: ${actor.salary}
                  </h4>
                  <h4 className="text-white text-sm">Role: {actor.role}</h4>
                </div>
                <button
                  onClick={() => handleSelect(actor)}
                  className="btn btn-primary text-white text-lg font-medium bg-sky-500 hover:bg-sky-700 px-5 py-4 rounded-lg"
                >
                  Select
                </button>
              </div>
            ))}
        </div>
      </div>
      <div className="w-full lg:w-1/3">
        <Cart
          selectedActors={selectedActors}
          remaining={remaining}
          totalCost={totalCost}
        ></Cart>
      </div>
    </div>
  );
};

export default Home;
