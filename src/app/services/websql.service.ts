import { Injectable } from '@angular/core';
import { database, column, ColumnType, Table, sqlite } from 'websql-orm';
import { EnvConfig } from 'websql-orm';

EnvConfig.enableDebugLog = true;
EnvConfig.dateFormatRemoveMillisecond = true;

@Injectable({
  providedIn: 'root'
})
@database("w2s_db","users")
export class users extends Table {
  @column(ColumnType.NUMBER | ColumnType.PRIMARY)
  id!: Number;
  @column(ColumnType.STRING)
  user_name!: string;
  @column(ColumnType.STRING)
  phone!: string;
  @column(ColumnType.STRING)
  email!: string;
  @column(ColumnType.STRING)
  password!: string;
  @column(ColumnType.STRING)
  role!: string;

  async insertData(name: string,phone: string,email: string,password: string,role: string){
    var user = new users();
    // user.id = id;
    user.user_name = name;
    user.phone = phone;
    user.email = email;
    user.password = password;
    user.role = role;

    var result = await sqlite.insert(user);
  }

  async updateData(id: Number,name: string,phone: string,email: string,role: string) {
    var info = await sqlite.fromSqlFirst(new users(),
      'select * from users where id=? ',
      [id]);
    info.user_name = name;
    info.phone = phone;
    info.email = email;
    info.role = role;
    var result = await info.save();
    return result;
  }

  async getUsrWithEmail(email: string,password: string) {
    // var list = await sqlite.query(new users(),{ email: email});
    let info = await sqlite.queryFirst(new users(),{ email: email,password:password});
    console.log(info);
    return info;
  }

  async getUsrWithId(id: Number) {
    // var list = await sqlite.query(new users(),{ email: email});
    let info = await sqlite.queryFirst(new users(),{ id: id});
    console.log(info);
    return info;
  }

  async getallRecords() {
    var list = await sqlite.fromSql(new users(),
      'select * from users', []);
    return list;

  }




}
