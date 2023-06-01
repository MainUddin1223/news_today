import { INewsReport } from '../interface/newsReport.interface'
import NewsReport from '../models/newsReport.mo'

const postReport = async (data: INewsReport) => {
  const { title, subTitle, photos, description, category, status, user } = data
  const report = new NewsReport({
    title,
    subTitle,
    photos,
    description,
    category,
    reporter: `${user.name.firstName} ${user.name.lastName}`,
    status,
    reporterEmail: user.email,
  })
  const result = await report.save()
  return result
}
export default { postReport }
