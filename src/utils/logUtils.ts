import { consoleColors } from "../constants/color";

type ErrorNumberProps = 400 | 403 | 404 | 500 | 502 | 503;

class Logging {
  private date!: Date;

  constructor() {
    this.date = new Date();
  }

  // Не правильно считает время => тесты, фиксы
  public handler(
    type: "Error" | "Success" | "Warning" | "Message",
    title: string,
    message: string
  ) {
    this.date.setHours(this.date.getUTCHours() + 3);

    const hours = this.date.getHours();
    const minutes = this.date.getMinutes();

    switch (type) {
      case "Error":
        console.log(`[${consoleColors.red}${type}${consoleColors.reset}] [${title}] [${hours}:${minutes}] - ${message}.`)
        break;

      case "Success":
        console.log(`[${consoleColors.green}${type}${consoleColors.reset}] [${title}] [${hours}:${minutes}] - ${message}.`);
        break;

      case "Warning":
        console.warn(`[${consoleColors.yellow}${type}${consoleColors.reset}] [${title}] [${hours}:${minutes}] - ${message}.`);
        break;

      case "Message":
        console.log(`[${consoleColors.blue}${type}${consoleColors.reset}] [${title}] [${hours}:${minutes}] - ${message}.`);
        break;

      default:
        break;
    }
  }

  // Вместо console.error() должно поступать сообщение об таковой ошибке в бд и т.п.
  // Чтобы далее можно было отследить откуда идет ошибка
  // А также попробовать оптимизировать данный код
  public errorHandler(typeNumber: ErrorNumberProps, cb: (status: number, defaultMessage: string) => void) {
    switch (typeNumber) {
      case 400:
        console.error("New server-side error, cb is active, wait response!");
        cb(typeNumber, 'DM: Bad Request');
        break;

      case 403:
        console.error("New server-side error, cb is active, wait response!");
        cb(typeNumber, 'DM: Forbidden');
        break;

      case 404:
        console.error("New server-side error, cb is active, wait response!");
        cb(typeNumber, 'DM: Not Found');
        break;

      case 500:
        console.error("New server-side error, cb is active, wait response!");
        cb(typeNumber, 'DM: Internal Server Error');
        break;

      case 502:
        console.error("New server-side error, cb is active, wait response!");
        cb(typeNumber, 'DM: Bad Gateway');
        break;

      case 503:
        console.error("New server-side error, cb is active, wait response!");
        cb(typeNumber, 'DM: Service unavailable');
        break;

      default: break;
    }
  }
}

const log = new Logging();

export default log;
