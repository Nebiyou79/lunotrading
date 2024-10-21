import axios from 'axios';
import { toast } from 'react-toastify';

type DepositAddresses = {
  usdtAddress: string;
  btcAddress: string;
  ethAddress: string;
};
 

export const getDepositAddresses = async (token: string) => {
    const response = await axios.get('https://116.203.108.180:5000/api/deposit/addresses', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }
  
  export const updateDepositAddresses= async (data: DepositAddresses, token: string) => {
     try {
       // Ensure that all required fields are present in the request body
       if (!data.usdtAddress || !data.btcAddress || !data.ethAddress) {
         return {
           status: 400,
           message: 'Error updating deposit addresses',
           error: {
             usdtAddress: !data.usdtAddress ? 'USDT address is required.' : null,
             btcAddress: !data.btcAddress ? 'BTC address is required.' : null,
             ethAddress: !data.ethAddress ? 'ETH address is required.' : null,
           },
         };
       }  
       const response = await axios.put('https://116.203.108.180:5000/api/deposit/addresses', data, {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });
       return response.data; 
     } catch (error) {
      toast.error('Error updating user balance');
      throw error;
   }
  };
