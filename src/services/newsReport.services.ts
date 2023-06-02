import { INewsReport } from '../interface/newsReport.interface'
import NewsReport from '../models/newsReport.mo'

const postReport = async (data: INewsReport) => {
  try {
    const { title, subTitle, photos, description, category, status, user } =
      data
    const report = new NewsReport({
      title,
      subTitle,
      reporterId: user.id,
      photos,
      description,
      category,
      reporter: `${user.name.firstName} ${user.name.lastName}`,
      status,
      reporterEmail: user.email,
    })
    const result = await report.save()
    return result
  } catch (error: unknown) {
    console.log(error)
    return error
  }
}
export default { postReport }
