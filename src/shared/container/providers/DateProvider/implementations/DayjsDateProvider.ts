import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compare(start_date: Date, end_date: Date): number {
    const formattedStartDate = dayjs(start_date).utc().local().format();
    const formattedEndDate = dayjs(end_date).utc().local().format();

    return dayjs(formattedEndDate).diff(formattedStartDate, "hours");
  }
}

export { DayjsDateProvider };
