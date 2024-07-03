// export const Options = {
//   method: 'GET',
//   headers: {
//     'key': '5738b405e0fe41ef971200146240107',
//   },
// };

export const FetchData = async (city) => {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=5738b405e0fe41ef971200146240107&q=${city}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};