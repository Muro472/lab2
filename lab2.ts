interface IProxy {
  startTaxy: (startAdres: string, endAdres?: string, time?: number) => void;
  endT1axy?: (adres: string) => void;
}

enum TaxyEnum {
  UBER = "Uber",
  BOLT = "Bolt",
  UKLON = "Uklon",
}

interface ITaxy {
  orderUklon: (startAdres: string, endAdres: string) => void;
  startUber: (adres: string) => void;
  endUber: (adres: string) => void;
  orderBolt: (startAdres: string, endAdres: string, time: number) => void;
}

class Taxy implements ITaxy {
  private orders: Array<any>;
  orderUklon(startAdres: string, endAdres: string) {
    this.orders.push({ startAdres: startAdres, endAdres: endAdres });
  }
  public startUber(adres: string) {
    this.orders.push({ adres: adres });
  }
  public endUber(adres: string) {
    this.orders = this.orders.filter((item: string) => adres !== item);
  }
  public orderBolt(startAdres: string, endAdres: string, time: number) {
    this.orders.push({
      startAdres: startAdres,
      endAdres: endAdres,
      time: time,
    });
  }
}

class TaxyProxy implements IProxy {
  taxy: any;
  type: TaxyEnum;
  constructor(type: TaxyEnum) {
    this.type = type;
    this.taxy = new Taxy();
  }

  public startTaxy(startAdres: string, endAdres?: string, time?: number) {
    this.taxy[
      ((): string => {
        if ((this.type = TaxyEnum.BOLT)) {
          return "orderBolt";
        }
        if ((this.type = TaxyEnum.UBER)) {
          return "startUber";
        }
        return "orderUklon";
      })()
    ](startAdres, endAdres, time);
  }
  public endT1axy(adres: string) {
    if ((this.type = TaxyEnum.UBER)) this.taxy.endUber(adres);
  }
}
