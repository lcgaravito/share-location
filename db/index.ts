import * as SQLite from "expo-sqlite";
import { MarkerType } from "../types";
const db = SQLite.openDatabase("locations.db");

export const init = () => {
  const promise = new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, image TEXT, direction TEXT NOT NULL, color TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL)",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
  return promise;
};

export const insertLocation = ({
  name,
  image,
  direction,
  color,
  latitude,
  longitude,
}: Omit<MarkerType, "id">) => {
  const promise = new Promise<SQLite.SQLResultSet>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO locations (name, image, direction, color, latitude, longitude) VALUES (?,?,?,?,?,?)",
        [name, image, direction, color, latitude, longitude],
        (_, result) => resolve(result),
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
  return promise;
};

export const fetchLocations = () => {
  const promise = new Promise<SQLite.SQLResultSet>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM locations",
        [],
        (_, result) => resolve(result),
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
  return promise;
};

export const deleteLocation = (id: string) => {
  const promise = new Promise<SQLite.SQLResultSet>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM locations WHERE id = ?",
        [id],
        (_, result) => resolve(result),
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
  return promise;
};
