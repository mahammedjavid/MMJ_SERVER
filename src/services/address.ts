import { Request } from "express";
import { UserTable, AddressTable } from "../relation/index";
import { validatePayload } from "../helper/payloadValidation";

async function _createAddressService(req: Request) {
  try {
    const {
      customer_id,
      add_type,
      add_one,
      add_two,
      state,
      city,
      pincode
    }: { 
      customer_id: number;
      add_type: string;
      add_one: string;
      add_two?: string;
      state: string;
      city: string;
      pincode: number;
    } = req.body;

    const requiredFields = ["customer_id", "add_type", "add_one" , "state" ,"city" , "pincode"];
    validatePayload(req.body, requiredFields);

    const user = await UserTable.findByPk(customer_id);
    if (!user) {
      throw new Error("User not found");
    }

    const address = await AddressTable.create({
      customer_id,
      add_type,
      add_one,
      add_two,
      state,
      city,
      pincode
    });

    return {
      data: address,
      message: "Address added successfully"
    };
  } catch (error) {
    console.error("Error in _createAddressService:", error);
    throw error;
  }
}

async function _getAddressListService(req: Request) {
  try {
    const { customer_id } = req.params;
    if(!customer_id) {
        throw new Error("Customer id not found");
    }
    const customer = await UserTable.findByPk(customer_id);
    if (!customer) {
      throw new Error("User not found");
    }

    const addressList = await AddressTable.findAll({
      where: { customer_id }
    });

    return {
      data: addressList,
      message: "Address list retrieved successfully"
    };
  } catch (error) {
    console.error("Error in _getAddressListService:", error);
    throw error;
  }
}

async function _updateAddressService(req: Request) {
  try {
    const { address_id } = req.params;
    if(!address_id) {
        throw new Error("Address id not found");
    }
    
    const {
      add_type,
      add_one,
      add_two,
      state,
      city,
      pincode
    }: { 
      add_type?: string;
      add_one?: string;
      add_two?: string;
      state?: string;
      city?: string;
      pincode?: number;
    } = req.body;

    const address = await AddressTable.findByPk(address_id);
    if (!address) {
      throw new Error("Address not found");
    }

    const updatedAddress = await address.update({
      add_type,
      add_one,
      add_two,
      state,
      city,
      pincode
    });

    return {
      data: updatedAddress,
      message: "Address updated successfully"
    };
  } catch (error) {
    console.error("Error in _updateAddressService:", error);
    throw error;
  }
}

async function _deleteAddressService(req: Request) {
  try {
    const { address_id } = req.params;
    if (!address_id) {
      throw new Error("Address ID is required");
    }

    const deletedRows = await AddressTable.destroy({
      where: { address_id }
    });

    if (deletedRows === 0) {
      throw new Error("Address not found");
    }

    return {
      data: deletedRows,
      message: "Address deleted successfully"
    };
  } catch (error) {
    console.error("Error in _deleteAddressService:", error);
    throw error;
  }
}

export {
  _createAddressService,
  _getAddressListService,
  _updateAddressService,
  _deleteAddressService
};
