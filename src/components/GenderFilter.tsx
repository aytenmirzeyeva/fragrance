import FilterCard from "./FilterCard";
import Heading from "./Heading/index";

const GenderFilter = () => {
  const gendersData = [
    {
      id: 1,
      name: "Unisex",
      perfumeCount: 8700,
      image:
        "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/unisex-symbol-icon.png",
    },
    {
      id: 2,
      name: "Women",
      perfumeCount: 18400,
      image:
        "https://media.istockphoto.com/id/868651322/vector/male-thin-line-vector-icon.jpg?s=612x612&w=0&k=20&c=hKgPJqnd6bR60CQAmRoxcIQyOYds1p-MlwfKp14YGc0=",
    },
    {
      id: 3,
      name: "Men",
      perfumeCount: 12848,
      image:
        "https://media.istockphoto.com/id/1300219183/vector/womens-washroom-accessibility-icon.jpg?s=612x612&w=0&k=20&c=DY6-9GGvymAb5lifPfiv8OCniPWLCT31S4ptD_j8CdE=",
    },
  ];
  return (
    <div className="py-4">
      <Heading headingText="Gender" className="text-lg" />
      <div className="flex flex-wrap justify-center">
        {gendersData.map((gender) => (
          <FilterCard
            key={gender.id}
            text={gender.name}
            image={gender.image}
            count={gender.perfumeCount}
          />
        ))}
      </div>
      <hr className="my-6" />
    </div>
  );
};

export default GenderFilter;
