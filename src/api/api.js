import AsyncStorage from "@react-native-async-storage/async-storage";

const storeProposalsData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);

    await AsyncStorage.setItem(`${value}`, jsonValue);
  } catch (e) {
    console.error(e.message);
  }
};

const getProposalsData = async (value) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`${value}`);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error(e.message);
  }
};
const getCEPData = async (cep) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Request failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error.message);
  }
};
const getCNPJData = async (cnpj) => {
  try {
    const response = await fetch(
      `https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cnpj}`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Request failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export default {
  storeProposalsData,
  getProposalsData,
  getCEPData,
  getCNPJData,
};
