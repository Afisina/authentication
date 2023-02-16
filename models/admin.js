"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static #encrypt = (password) => bcrypt.hashSync(password, 10);

    //method untuk register
    static register = ({ username, password }) => {
      const encryptedPassword = this.#encrypt(password);
      return this.create({ username, password: encryptedPassword });
    };

    /*Semua yang berhubungan dengan login*/
    //method untuk melakukan enkripsi, .compareSync digunakan untuk mecocokkan plaintext dengan hash
    checkPassword = (password) => bcrypt.compareSync(password, this.password);

    //method untuk membuat JWT
    generateToken = () => {
      //jangan memasukkan passwod ke dalam paylod
      const payload = {
        id: this.id,
        username: this.username,
      };
      //rahasia dipakai untuk memverifikasi apakah token ini benar2 berasal dari aplikasi
      const rahasia = "ini rahasia ga bolehh disebar";
      //membuat token dari data-data di atas
      const token = jwt.sign(payload, rahasia);
      return token;
    };

    //method authenticate untuk login
    static authenticate = async ({ username, password }) => {
      try {
        const admin = await this.findOne({ where: { username } });
        if (!admin) return Promise.reject("user not found!");

        const isPasswordValid = admin.checkPassword(password);
        if (!isPasswordValid) return Promise.reject("Wrong password");

        return Promise.resolve(admin);
      } catch (err) {
        return Promise.reject(err);
      }
    };
    /*akhir dari semua yang berhubungan dengan login*/
  }
  Admin.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );
  return Admin;
};
