import { useDispatch, useSelector } from "react-redux";
import { userApi } from "../../api";
import {
  createUser,
  deleteUser,
  updateUser,
  refreshUsers,
} from "../../store";
import { createUserGoogleModel } from "../../shared/models";

export const useUsersStore = () => {
  const { users, selected } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const startCreateUser = async (user, role) => {
    try {
      const newUser = createUserGoogleModel(user, role);
      console.log(newUser)
      const { data } = await userApi.post("/", newUser);
      return { ok: true, data };
    } catch (error) {
      console.log(error)
      return false;
    }
  };

  const findUserByEmail = async (email) => {
    try {
      const { data } = await userApi.get(`find/${email}`);
      if (!data) {
        return { ok: false, data: null };
      }
      return { ok: true, data };
    } catch (error) {
      return false;
    }
  }

  // const startDeleteCustomer = async (id) => {
  //   try {
  //     await userApi.delete(`/${id}`, {
  //       headers: { 'Authorization': `Bearer ${token()}` }
  //     });
  //     dispatch(deleteUser(id));
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // };

  // const startUpdateCustomer = async (id, data) => {
  //   try {
  //     const converted = convertProps(data, toBackCustomer);
  //     await userApi.patch(`/${id}`, converted, {
  //       headers: { 'Authorization': `Bearer ${token()}` }
  //     });
  //     dispatch(updateUser({ id, ...data }));
  //     return true;
  //   } catch (error) {
  //     console.log(error)
  //     return false;
  //   }
  // };

  // const startRefreshCustomers = async () => {
  //   try {
  //     const { data } = await userApi.get("/", {
  //       headers: { Authorization: `Bearer ${token()}` },
  //     });
  //     // console.log(data.data)
  //     dispatch(refreshUsers(data.data.map((customer) => convertProps(customer, toFrontCustomer))));
  //     return true;
  //   } catch (error) {
  //     return false;
  //   }
  // };

  // const findCustomerById = (id) => {
  //   return customers.find((customer) => customer.id === id);
  // }

  return {
    users,
    selected,
    // startRefreshCustomers,
    // startDeleteCustomer,
    startCreateUser,
    // startUpdateCustomer,
    // findCustomerById,
    findUserByEmail
  };
};