const CategorySelector = ({ setCategory }) => (
  <select onChange={(e) => setCategory(e.target.value)} className="border px-3 py-2 my-2">
    <option value="">Select Category</option>
    <option value="ssc">SSC</option>
    <option value="hsc">HSC</option>
    <option value="admission">Admission</option>
  </select>
);
export default CategorySelector;
