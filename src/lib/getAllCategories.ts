import axios from 'axios';

export default async function getAllCategories() {
  const { data: res } = await axios.post(`${process.env.BASIC_URL}/api/common/get-all-categories`);
  return res.categories;
}
