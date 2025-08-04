import { Response , Request} from "express"
import Owner from "../models/ownerModel";




// --------------------------------------------------ADDED PROPERTIES--------------------------------------------------

export const getOwnerWithProperties = async (req: Request, res: Response) => {
  const { ownerId } = req.params;
  try {
    const owner = await Owner.findOne({user : ownerId})
      .populate('properties'); // if `properties` is [ObjectId] to Property

    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    res.status(200).json(owner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' })
  }
};