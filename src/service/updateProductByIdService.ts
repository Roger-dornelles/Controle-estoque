import axiosClient from '@/config/axios';
import { UpdateProductByIdType } from '@/types/productsType';
import axios from 'axios';

const updateProductByIdService = async ({ id, token, name, description, output, input }: UpdateProductByIdType) => {
  try {
    if (!id) {
      return {
        error: true,
        message: 'Id invalido.',
        data: null,
      };
    }

    if (name || description || output || input) {
      let response = await axiosClient({
        url: `/update/product/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          name,
          description,
          output,
          input,
        },
      });

      if (response.data.error) {
        return {
          error: true,
          message: response.data.error,
          data: null,
        };
      }

      return {
        error: false,
        message: '',
        data: response.data,
      };
    }
  } catch (error) {
    return {
      error: true,
      message: 'Ocorreu um erro, tete mais tarde.',
      data: null,
    };
  }
};

export default updateProductByIdService;
