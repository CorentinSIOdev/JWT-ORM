const { DataTypes } = require("sequelize");
const db = require("../db/db_conf");

  // Modèle pour la table 'cart'
  const Cart = db.define('cart', {
    id_cart: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    qts: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    timestamps: false,
  });  
  
  // Modèle pour la table 'categories'
  const Categories = db.define('categories', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    web_title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    parent: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    leval: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
  
  // Modèle pour la table 'cities'
  const Cities = db.define('cities', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    country_code: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    district: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
  
  // Modèle pour la table 'countries'
  const Countries = db.define('countries', {
    code: {
      type: DataTypes.STRING(3),
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
    },
    continent: {
      type: DataTypes.TEXT,
    },
    region: {
      type: DataTypes.TEXT,
    },
    local_name: {
      type: DataTypes.TEXT,
    },
    capital: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    code2: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: false,
  });
  
  // Modèle pour la table 'products'
  const Products = db.define('products', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    product_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dossier: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    in_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    nbr_image: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    date_added: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  }, {
    timestamps: false,
  });
  
  // Modèle pour la table 'users'
  const Users = db.define('users', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    user_phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    user_fname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_lname: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    user_password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_adress: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    user_login_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    timestamps: false,
  });
  
  // Définir les relations entre les tables
  
    // Relation entre 'Cart' et 'Users'
    Cart.belongsTo(Users, { foreignKey: 'user_id' });
    Users.hasMany(Cart, { foreignKey: 'user_id' });

    // Relation entre 'Cart' et 'Products'
    Cart.belongsTo(Products, { foreignKey: 'product_id' });
    Products.hasMany(Cart, { foreignKey: 'product_id' });

    // Relation entre 'Products' et 'Categories'
    Products.belongsTo(Categories, { foreignKey: 'category_id' });
    Categories.hasMany(Products, { foreignKey: 'category_id' });

    // Relation entre 'Cities' et 'Countries'
    Cities.belongsTo(Countries, { foreignKey: 'country_code' });
    Countries.hasMany(Cities, { foreignKey: 'country_code' });

    // Relation entre 'Users' et 'Cities'
    Users.belongsTo(Cities, { foreignKey: 'user_city' });
    Cities.hasMany(Users, { foreignKey: 'user_city' });
    
  // Exporter les modèles
  module.exports = {
    Cart,
    Categories,
    Cities,
    Countries,
    Products,
    Users,
  };