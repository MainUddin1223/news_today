import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../interface/auth.interface';
import User from '../models/auth.mo';
import NewsReport from '../models/newsReport.mo';
import { inviteForRole, approveForRole } from '../services/admin.services';

const inviteEmployeeForRole = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const result = await inviteForRole(data);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};
const approveEmplyeeForRole = async (req: Request, res: Response) => {
  const id = req.query.id as string;
  try {
    const result = await approveForRole(id);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

const getStuffByRole = async (req: AuthenticatedRequest, res: Response) => {
  const role = req.query;
  try {
    const result = await User.find({ role });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

const getReportsByDateAndStatus = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { status, date } = req.query;
  try {
    const result = await NewsReport.find({ status, createdAT: date });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

export const andminRoutes = {
  getStuffByRole,
  getReportsByDateAndStatus,
  inviteEmployeeForRole,
  approveEmplyeeForRole,
};
