import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase('places.db')

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists places (id integer primary key not null, title text not null, imageUrl text not null, address text not null, lat real not null, lng real not null);",
        [],
        () => {
            resolve();
        },
        (_, err) => {
            reject(err);
        }
      );
    });
  });
  return promise;
};

export const storingData = (title, imageUrl, address, lat, lng) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "insert into places (title, imageUrl, address, lat, lng) values (?, ?, ?, ?, ?);",
            [title, imageUrl, address, lat, lng],
            (_, result) => {
                resolve(result);
            },
            (_, err) => {
                reject(err);
            }
          );
        });
      });
      return promise;
}

export const fetchingPlaces = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            "select * from places",
            [],
            (_, result) => {
                resolve(result);
            },
            (_, err) => {
                reject(err);
            }
          );
        });
      });
      return promise;
}