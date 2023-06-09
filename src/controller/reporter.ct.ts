import { Response } from 'express';
import newsReportValidator from '../validator/newsReport.validator';
import { AuthenticatedRequest } from '../interface/auth.interface';
import { reporterService } from '../services/reporter.services';
import NewsReport from '../models/newsReport.mo';
import UserInfo from '../models/userInfo.mo';
import { IUserPaylod } from '../interface/newsReport.interface';

const { newsReportSchema } = newsReportValidator;

const invitation = async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user as IUserPaylod;
  try {
    const result = await UserInfo.findOneAndUpdate(
      { userId: user.id },
      { $set: { status: 'accepted' } }
    );
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

const createReport = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { error } = newsReportSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const result = await reporterService.createReport({
      ...req.body,
      user: req.user,
    });
    res.status(200).send({ result });
  } catch (error) {
    console.log(error);
  }
};
const updateReport = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { error } = newsReportSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.message });
    }
    const reportId = req.params.id as string;
    const result = await reporterService.createReport({
      ...req.body,
      reportId,
      user: req.user,
    });
    res.status(200).send({ result });
  } catch (error) {
    console.log(error);
  }
};

const getMyAllReports = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const reporterId = req.user?.id;
    const result = await NewsReport.find({ reporterId });
    res.status(200).send({ result });
  } catch (error) {
    console.log(error);
  }
};

const getReportsCategory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const category = 'sports';
    // const category = req.body.category
    const result = await NewsReport.find({ category });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

const getReportById = async (req: AuthenticatedRequest, res: Response) => {
  const reportId = req.params.id as string;
  try {
    const result = await NewsReport.findOne({ _id: reportId });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

export const ReporterController = {
  createReport,
  getMyAllReports,
  getReportsCategory,
  updateReport,
  invitation,
  getReportById,
};
