import { INewsReport } from '../interface/newsReport.interface'
import NewsReport from '../models/newsReport.mo'

const postReport = async (data: INewsReport) => {
  const { title, subTitle, photos, description, category, status } = data
  const report = new NewsReport({
    title,
    subTitle,
    photos,
    description,
    category,
    reporter: 'Main Uddin',
    status,
    reporterEmail: 'main@gmail.com',
  })
  const result = await report.save()
  return result
}
export default { postReport }
