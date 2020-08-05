import iconv from "iconv-lite";

import map from "./map";
import machines from "./machines";

import { OKE, Team } from "../models/team";

// なぜかゴミが入ってることがあるので消す
const deleteTrash = (buf: Buffer): Buffer => {
  const index = buf.indexOf(0x00);
  if (index !== -1) {
    return buf.slice(0, index);
  }
  return buf;
};

// 識別名が初期値か？
const isMachineNameInitialValue = (buf: Buffer): boolean => {
  const index = buf.indexOf(0xff);
  if (index !== -1) {
    return true;
  }
  return false;
};

// OKEの名前と識別名を取得する
const machine = (
  registered: Buffer,
  id: Buffer,
  name: Buffer
): OKE | undefined => {
  if (registered.toString("hex") === "00") {
    return undefined;
  }
  const machineName = machines[id.toString("hex")];
  if (!machineName) {
    console.error("存在しないOKEが登録されています。");
    process.exit(1);
  }
  const identifierName = iconv.decode(name, "Shift_JIS");
  if (
    isMachineNameInitialValue(name) ||
    identifierName.replace(/\0/g, "") === ""
  ) {
    return {
      name: machineName,
      nickname: machineName
    };
  }
  // なぜかmachineNameと一致するidentifierNameが存在する場合がある
  if (machineName === identifierName) {
    return {
      name: machineName,
      nickname: machineName
    };
  }
  return {
    name: machineName,
    nickname: identifierName
  };
};

const decode = async (data: Buffer): Promise<Team | undefined> => {
  const team: Team = {
    name: "",
    owner: "",
    okes: new Array(3).fill(undefined),
    emblem: undefined
  };
  if (data.length !== 24512) {
    return undefined;
  }
  team.name = iconv.decode(
    deleteTrash(data.slice(...map.teamName)),
    "Shift_JIS"
  );
  team.owner = iconv.decode(
    deleteTrash(data.slice(...map.ownerName)),
    "Shift_JIS"
  );

  const machine1 = machine(
    data.slice(...map.registered1),
    data.slice(...map.machine1),
    deleteTrash(data.slice(...map.machineName1))
  );
  const machine2 = machine(
    data.slice(...map.registered2),
    data.slice(...map.machine2),
    deleteTrash(data.slice(...map.machineName2))
  );
  const machine3 = machine(
    data.slice(...map.registered3),
    data.slice(...map.machine3),
    deleteTrash(data.slice(...map.machineName3))
  );

  const which = (id: string, index: number): void => {
    if (id.replace(/\0/g, "") === "") {
      if (machine1) {
        team.okes[index] = { ...machine1 };
      }
    }
    if (id === "01") {
      if (machine2) {
        team.okes[index] = { ...machine2 };
      }
    }
    if (id === "02") {
      if (machine3) {
        team.okes[index] = { ...machine3 };
      }
    }
  };

  which(deleteTrash(data.slice(...map.whichMachine1)).toString("hex"), 0);
  which(deleteTrash(data.slice(...map.whichMachine2)).toString("hex"), 1);
  which(deleteTrash(data.slice(...map.whichMachine3)).toString("hex"), 2);

  team.okes = team.okes.map((oke, index): OKE | undefined => {
    if (oke) {
      // eslint-disable-next-line no-param-reassign
      oke.position = data[map.machinePositions[index]];
    }
    return oke;
  });

  const colorPalette = map.colorPalette.map(p => {
    const target = data.slice(...p);
    // RGBは28が初期値です
    return {
      r: target[0] - 28,
      g: target[1] - 28,
      b: target[2] - 28,
      a: target[3]
    };
  });

  const isDefault = ((): boolean => {
    for (let index = 0; index < colorPalette.length; index += 1) {
      const p = colorPalette[index];
      if (p.r < 0 || p.g < 0 || p.b < 0) {
        return true;
      }
    }
    return false;
  })();

  if (!isDefault) {
    const emblem = data.slice(...map.emblem).toString("hex");
    const cells = [];
    for (let index = 0; index < emblem.length / 2; index += 1) {
      cells.push(emblem.substr(index * 2, 2));
    }
    const image = cells
      .map(cell =>
        cell
          .split("")
          .reverse()
          .join("")
      )
      .join("");
    team.emblem = {
      colorPalette,
      image
    };
  }
  return team;
};

export default decode;
