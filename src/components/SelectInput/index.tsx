const years: number[] = [];

for (let year = 1900; year <= 2024; year++) {
  years.push(year);
}
const SelectInput = () => {
  return (
    <select className="py-1 px-2 text-sm rounded-lg border my-5  border-pink-200 shadow-inner-lg focus:border-pink-300 focus:outline-none focus:shadow-lg transition-all duration-500">
      {years.map((year) => (
        <option value="year">{year}</option>
      ))}
    </select>
  );
};

export default SelectInput;
