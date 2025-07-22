import { Response , Request } from "express"
import Property from "../models/propertiesModel"


export const properties = async (req : Request , res : Response) =>{

    try{
        const properties = await Property.find()

        .sort({ createdAt: -1})

        res.status(200).json({
            success:true,
            count:properties.length,
            data:properties
        })
    }catch(error){
        console.error("Error fetching properties:" , error);
        res.status(500).json({
            success:false,
            message:"Serverr error"
        })
    }
}

export const propertyId = async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({
      message: "Your property",
      property,
    });
  } catch (error) {
    console.error("Error on fetching property:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
