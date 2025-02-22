USE [master]
GO
/****** Object:  Database [GDA00448_OT_JonathanBarrios]    Script Date: 06/01/2025 23:12:48 ******/
CREATE DATABASE [GDA00448_OT_JonathanBarrios]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'testa', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\testa.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'testa_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\testa_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [GDA00448_OT_JonathanBarrios].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET ARITHABORT OFF 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET  ENABLE_BROKER 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET  MULTI_USER 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET DB_CHAINING OFF 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET QUERY_STORE = ON
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [GDA00448_OT_JonathanBarrios]
GO
/****** Object:  Table [dbo].[products]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[products](
	[product_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](100) NOT NULL,
	[brand] [varchar](50) NULL,
	[price] [decimal](10, 2) NULL,
	[stock] [int] NULL,
	[category_id] [int] NULL,
	[code] [varchar](50) NULL,
	[date_creation] [datetime] NULL,
	[image_url] [varchar](100) NULL,
	[is_disabled] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[ActiveAvailableProducts]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/* 
 * VISTA PARA PRODUCTOS ACTIVOS QUE TENGAN STOCK DISPONIBLE 
*/

CREATE VIEW [dbo].[ActiveAvailableProducts]
AS
	SELECT product_id, name, stock
	FROM products 
	WHERE is_disabled = 0 AND stock > 0
GO
/****** Object:  Table [dbo].[orders]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[orders](
	[order_id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NULL,
	[date_creation] [datetime] NULL,
	[status_id] [int] NULL,
	[total_price] [decimal](38, 0) NULL,
	[address] [varchar](250) NULL,
	[client_name] [varchar](50) NULL,
	[client_phone] [varchar](8) NULL,
	[details] [nvarchar](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[order_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[TotalInAugust2024]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- dbo.TotalInAugust2024 source

/* 
 * VISTA PARA GANANCIAS EN ORDENES ACEPTADAS DE AGOSTO DEL 2024 
*/

CREATE VIEW [dbo].[TotalInAugust2024]
AS
	SELECT SUM(total_price) as total_earned
	FROM orders 
	WHERE status = 2 AND (MONTH(date_creation) = 8) AND (YEAR(date_creation) = 2024)
GO
/****** Object:  Table [dbo].[order_products]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order_products](
	[order_details_id] [int] IDENTITY(1,1) NOT NULL,
	[order_id] [int] NULL,
	[product_id] [int] NULL,
	[quantity] [int] NULL,
	[subtotal] [decimal](38, 0) NULL,
PRIMARY KEY CLUSTERED 
(
	[order_details_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[TopTenProducts]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[TopTenProducts]
AS
	SELECT TOP 10 p.product_id, p.name, SUM(op.quantity) as total_quantity
	FROM products p
	INNER JOIN order_products op 
	ON p.product_id = op.product_id
	GROUP BY p.product_id, p.name
	ORDER BY total_quantity DESC
GO
/****** Object:  Table [dbo].[users]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[email] [varchar](100) NOT NULL,
	[password] [varchar](255) NOT NULL,
	[full_name] [varchar](50) NULL,
	[phone] [varchar](8) NULL,
	[birthday] [date] NULL,
	[date_creation] [datetime] NULL,
	[address] [varchar](250) NULL,
	[rol_id] [int] NULL,
	[is_disabled] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[TopTenClients]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[TopTenClients]
AS
	SELECT TOP 10 u.user_id, u.email, u.full_name, SUM(o.total_price) as total_spend
	FROM users u
	INNER JOIN orders o 
	ON u.user_id = o.user_id
	GROUP BY u.user_id, u.email, u.full_name
	ORDER BY total_spend DESC
GO
/****** Object:  Table [dbo].[categories]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[categories](
	[category_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NULL,
	[is_disabled] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[category_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[roles]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[roles](
	[rol_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](50) NULL,
	[permissions] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[rol_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[status]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[status](
	[status_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](30) NULL,
 CONSTRAINT [status_types_pk] PRIMARY KEY CLUSTERED 
(
	[status_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[categories] ADD  DEFAULT ((0)) FOR [is_disabled]
GO
ALTER TABLE [dbo].[orders] ADD  DEFAULT ('now()') FOR [date_creation]
GO
ALTER TABLE [dbo].[orders] ADD  DEFAULT ((1)) FOR [status_id]
GO
ALTER TABLE [dbo].[orders] ADD  DEFAULT ((0.0)) FOR [total_price]
GO
ALTER TABLE [dbo].[products] ADD  DEFAULT ('now()') FOR [date_creation]
GO
ALTER TABLE [dbo].[products] ADD  DEFAULT ((0)) FOR [is_disabled]
GO
ALTER TABLE [dbo].[roles] ADD  DEFAULT ((0)) FOR [permissions]
GO
ALTER TABLE [dbo].[users] ADD  DEFAULT ((1)) FOR [rol_id]
GO
ALTER TABLE [dbo].[users] ADD  DEFAULT ((0)) FOR [is_disabled]
GO
ALTER TABLE [dbo].[order_products]  WITH CHECK ADD FOREIGN KEY([order_id])
REFERENCES [dbo].[orders] ([order_id])
GO
ALTER TABLE [dbo].[order_products]  WITH CHECK ADD FOREIGN KEY([product_id])
REFERENCES [dbo].[products] ([product_id])
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([status_id])
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([status_id])
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD FOREIGN KEY([status_id])
REFERENCES [dbo].[status] ([status_id])
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([user_id])
GO
ALTER TABLE [dbo].[products]  WITH CHECK ADD FOREIGN KEY([category_id])
REFERENCES [dbo].[categories] ([category_id])
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD FOREIGN KEY([rol_id])
REFERENCES [dbo].[roles] ([rol_id])
GO
/****** Object:  StoredProcedure [dbo].[CheckProductStock]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CheckProductStock]
/* 
 * PROCEDIMIENTO PARA CHECAR SI EXISTE SUFICIENTE STOCK
 * 
 * Parámetros:
 * @product_id
 * @quantity
 * 
 * De existir suficiente stock, se devuelve IsStockAvailable = 1
*/
	@product_id INT,
	@quantity INT
AS 
	BEGIN
		DECLARE @stock INT
		
		SELECT @stock = stock FROM products WHERE product_id = @product_id
		
		IF @Stock >= @quantity
			SELECT 1 AS IsStockAvailable
		ELSE
			SELECT 0 AS IsStockAvailable
	END
	
GO
/****** Object:  StoredProcedure [dbo].[CreateOrder]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* 
 * PROCEDIMIENTO PARA CREAR ORDEN
 * 
 * Parámetros:
 * @user_id - ID SQL del Usuario
 * 
 * 
*/

CREATE PROCEDURE [dbo].[CreateOrder]
	@user_id int
AS
	BEGIN
		DECLARE @order_id int
		DECLARE @address varchar(255)
		DECLARE @client_name varchar(50)
		DECLARE @client_phone varchar(8)
		
		SET @address = (SELECT address FROM users WHERE user_id = @user_id)
		SET @client_name = (SELECT full_name FROM users WHERE user_id = @user_id)
		SET @client_phone = (SELECT phone FROM users WHERE user_id = @user_id)
		
		INSERT INTO orders (
			user_id,
			date_creation,
			address,
			client_name,
			client_phone
		)
		VALUES (
			@user_id,
			GETDATE(),
			@address,
			@client_name,
			@client_phone
		)

		SET @order_id = SCOPE_IDENTITY()

		SELECT * FROM orders WHERE order_id = @order_id
		
	END
GO
/****** Object:  StoredProcedure [dbo].[CreateOrderProducts]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateOrderProducts]

/* 
 * PROCEDIMIENTO PARA CREAR CADA PRODUCTO INDIVIDUAL DE UNA ORDEN
 * 
 * Parámetros:
 * @order_id - ID de la orden donde se agregará el producto
 * @product_id - ID del producto a agregar
 * @quantity - Cantidad del producto
 * @subtotal - Cantidad de productos * Precio individual
 * 
 * 
*/
	@order_id int,
	@product_id int,
	@quantity int
	
AS
	BEGIN
		
		DECLARE @subtotal decimal(10,2)
		DECLARE @price decimal(10,2)
		SET @price = (SELECT price FROM products WHERE product_id = @product_id)
		SET @subtotal = @price * @quantity
		
		INSERT INTO order_products 
		(
			order_id,
			product_id,
			quantity,
			subtotal
		)
		VALUES (
			@order_id,
			@product_id,
			@quantity,
			@subtotal
		)
		
		DECLARE @order_product_id int = SCOPE_IDENTITY()	
		SELECT * FROM order_products WHERE order_details_id = @order_product_id
	
		UPDATE products SET stock = stock - @quantity WHERE product_id = @product_id
		UPDATE orders SET total_price = total_price + @subtotal WHERE order_id = @order_id
		SELECT * FROM orders WHERE order_id = @order_id
		
	END
GO
/****** Object:  StoredProcedure [dbo].[CreateProduct]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateProduct]

/* 
 * PROCEDIMIENTO PARA CREAR PRODUCTO
 * 
 * Parámetros:
 * @name - Nombre 
 * @brand - Marca
 * @price - Precio
 * @stock - Stock existente
 * @category_id - Categoria
 * @code - Codigo de barras
 * 
 * 
*/
	@name varchar(100),
	@brand varchar(50),
	@price decimal(9),
	@stock int,
	@category_id int,
	@code varchar(50)
	
AS
	BEGIN
		DECLARE @product_id int;
		INSERT INTO products (
			name,
			brand,
			price,
			stock,
			category_id,
			code,
			date_creation
		)
		VALUES (
			@name,
			@brand,
			@price,
			@stock,
			@category_id,
			@code,
			GETDATE()
		)

		SET @product_id = SCOPE_IDENTITY()

		SELECT * FROM products WHERE product_id = @product_id
	END
GO
/****** Object:  StoredProcedure [dbo].[CreateProductCategory]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* 
 * PROCEDIMIENTO PARA CREAR UNA CATEGORIA
 * 
 * Parámetros:
 * @name 
 * 
 * 
*/

CREATE PROCEDURE [dbo].[CreateProductCategory]
	@name varchar(50)
AS
	BEGIN	
		INSERT INTO categories (
			name
		)
		VALUES (
			@name
		)
		
		DECLARE @category_id int
		SET @category_id = SCOPE_IDENTITY()
		
		SELECT * FROM categories WHERE category_id = @category_id
	END
GO
/****** Object:  StoredProcedure [dbo].[CreateUser]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/* 
 * PROCEDIMIENTO PARA CREAR USUARIO
 * 
 * Parámetros:
 * @email - Correo electrónico 
 * @password - Contraseña (bcrypt)
 * @full_name - Nombre completo del usuario
 * @phone - Número de teléfono
 * @birthday - Fecha de nacimiento
 * @rol_id - Rol
 * @address
 * 
*/

CREATE PROCEDURE [dbo].[CreateUser]
	@email varchar(50),
	@password varchar(255),
	@full_name varchar(50),
	@phone varchar(8),
	@birthday datetime,
	@rol_id int,
	@address varchar(250)
AS
	BEGIN
		DECLARE @user_id int;
		INSERT INTO users (
			email,
			password,
			full_name,
			phone,
			birthday,
			date_creation,
			rol_id,
			address
		)
		VALUES (
			@email,
			@password,
			@full_name,
			@phone,
			@birthday,
			GETDATE(),
			@rol_id,
			@address
		)

		SET @user_id = SCOPE_IDENTITY()

		SELECT * FROM users WHERE user_id = @user_id
	END
RETURN 0
GO
/****** Object:  StoredProcedure [dbo].[LoadAllProducts]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LoadAllProducts]
/* 
 * PROCEDIMIENTO PARA CARGAR PRODUCTOs
 * 
 * 
 * 
*/

AS 
	BEGIN
		SELECT 
		p.product_id, 
		p.name, 
		p.brand, 
		p.price, 
		p.stock, 
		p.category_id, 
		c.name AS category_name,
		p.image_url, 
		p.is_disabled 
		FROM products p 
		INNER JOIN categories c ON p.category_id = c.category_id
	END
	
GO
/****** Object:  StoredProcedure [dbo].[LoadOrder]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LoadOrder]

/* 
 * PROCEDIMIENTO PARA CARGAR UNA ORDEN
 * 
 * Parametros
 * @order_id 
 * 
*/
	@order_id int

AS
	BEGIN
		SELECT o.order_id, o.user_id, o.client_name, o.client_phone,o.date_creation, o.address, o.total_price, o.status_id, s.name
		FROM orders o 
		INNER JOIN status s
		ON o.status_id = s.status_id
		
		WHERE o.order_id = @order_id
	END
GO
/****** Object:  StoredProcedure [dbo].[LoadOrderDetailsByMaster]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LoadOrderDetailsByMaster]

/* 
 * PROCEDIMIENTO PARA CARGAR LOS PRODUCTOS DE UNA ORDEN
 * 
 * Parametros
 * @order_id 
 * 
*/
	@order_id int

AS
	BEGIN
		SELECT op.order_details_id, p.name, op.quantity, op.subtotal
		FROM order_products op
		INNER JOIN products p 
		ON op.product_id = p.product_id
		WHERE op.order_id = @order_id
	END
GO
/****** Object:  StoredProcedure [dbo].[LoadOrders]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LoadOrders]

/* 
 * PROCEDIMIENTO PARA CARGAR TODAS LAS ORDENES Y EL NOMBRE DEL CLIENTE
 * 
 
 * 
 * 
*/

AS
	BEGIN
		
		SELECT o.order_id, o.user_id, u.full_name, o.date_creation, o.address, o.total_price, o.status_id, s.name
		FROM orders o 
		INNER JOIN users u 
		ON o.user_id = u.user_id
		INNER JOIN status s
		ON o.status_id = s.status_id
	END
GO
/****** Object:  StoredProcedure [dbo].[LoadOrdersByUser]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LoadOrdersByUser]

/* 
 * PROCEDIMIENTO PARA CARGAR TODAS LAS ORDENES DEL CLIENTE
 * 
 * Parametros
 * @user_id
*/
@user_id int
AS
	BEGIN
		SELECT o.order_id, o.date_creation, o.total_price, o.status_id, s.name
		FROM orders o 
		INNER JOIN status s
		ON o.status_id = s.status_id
		WHERE user_id = @user_id
	END
GO
/****** Object:  StoredProcedure [dbo].[LoadProductByCode]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LoadProductByCode]
/* 
 * PROCEDIMIENTO PARA CARGAR PRODUCTO SEGUN EL CODIGO
 * 
 * Parámetros:
 * @code
 * 
*/
	@code varchar(50)
AS 
	BEGIN
		SELECT * FROM products
		WHERE
			code = @code
	END
	
GO
/****** Object:  StoredProcedure [dbo].[LoadProducts]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LoadProducts]
/* 
 * PROCEDIMIENTO PARA CARGAR PRODUCTOS SEGUN CRITERIOS
 * 
 * Parámetros:
 * @name
 * @brand
 * @price_min
 * @price_max
 * @category_id
 * 
 * 
*/
	@name varchar(100),
	@brand varchar(50),
	@price_min int,
	@price_max int,
	@category_id int
AS 
	BEGIN
		SELECT p.product_id, p.name, p.brand, p.price, p.category_id, c.name as category_name, p.image_url, p.stock  FROM products p
		INNER JOIN categories c
		ON p.category_id = c.category_id
		WHERE
			(p.price >= @price_min AND 
			p.price <= @price_max) AND
			
			(@name IS NULL OR p.name LIKE '%' + @name + '%') AND
			(@brand IS NULL OR p.brand LIKE '%' + @brand + '%') AND
			(@category_id IS NULL OR p.category_id = @category_id) AND
			p.is_disabled = 0
	END
	
GO
/****** Object:  StoredProcedure [dbo].[LoadTopProducts]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LoadTopProducts]
/* 
 * PROCEDIMIENTO PARA CARGAR PRODUCTOS MAS COMPRADOS
 * 
 * 
 * 
*/
AS 
	BEGIN
		SELECT TOP 4 
			p.product_id, 
			p.name, 
			p.brand, 
			p.price, 
			p.stock, 
			p.category_id,
			c.name AS category_name, 
			p.image_url, 
			p.is_disabled, 
            COUNT(op.product_id) AS total_purchases
			FROM products p
			JOIN order_products op ON p.product_id = op.product_id
			JOIN categories c ON p.category_id = c.category_id
			WHERE p.is_disabled = 0
			GROUP BY p.product_id, p.name, p.brand, p.price, p.stock, p.category_id, c.name, p.image_url, p.is_disabled
			ORDER BY total_purchases DESC;
	END
	
GO
/****** Object:  StoredProcedure [dbo].[LoadUserData]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LoadUserData]
/* 
 * PROCEDIMIENTO PARA CARGAR DATOS DEL USUARIO
 * 
 * Parámetros:
 * @user_id
 * 
 * 
*/
	@user_id INT
AS 
	BEGIN
		SELECT * FROM users WHERE user_id = @user_id
	END
	
GO
/****** Object:  StoredProcedure [dbo].[LoadUserPassword]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LoadUserPassword]
/* 
 * PROCEDIMIENTO PARA CARGAR LA CONTRASEÑA DEL USUARIO SEGÚN EL CORREO INGRESADO
 * 
 * Parámetros:
 * @email - Email a cargar
 * 
 * 
*/
	@email varchar(100)
AS 
	BEGIN
		SELECT user_id, password FROM users WHERE email = @email
	END
	
GO
/****** Object:  StoredProcedure [dbo].[LoadUsersData]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LoadUsersData]
/* 
 * PROCEDIMIENTO PARA CARGAR TODOS LOS USUARIOS
 *  
 * 
*/
AS 
	BEGIN
		SELECT user_id, email, full_name, rol_id, phone, address, birthday, date_creation, is_disabled FROM users
	END
	
GO
/****** Object:  StoredProcedure [dbo].[UpdateCategory]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateCategory]

/* 
 * PROCEDIMIENTO PARA ACTUALIZAR UNA CATEGORIA
 * 
 * Parámetros:
 * @category_id
 * @is_disabled
 * @name
 * 
*/
	@category_id int,
	@name VARCHAR(50),
	@is_disabled bit
AS
	BEGIN
		
		UPDATE categories SET is_disabled = @is_disabled, name = @name WHERE category_id = @category_id

		SELECT * FROM categories WHERE category_id = @category_id
	END

GO
/****** Object:  StoredProcedure [dbo].[UpdateCategoryStatus]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateCategoryStatus]

/* 
 * PROCEDIMIENTO PARA CAMBIAR EL ESTADO DE UNA CATEGORIA
 * 
 * Parámetros:
 * @category_id
 * 
*/
	@category_id int
AS
	BEGIN		
			
		UPDATE products
		SET is_disabled = 1 
		WHERE category_id = @category_id
		
		UPDATE categories SET is_disabled = is_disabled ^ 1 WHERE category_id = @category_id

		SELECT * FROM categories WHERE category_id = @category_id
	END

GO
/****** Object:  StoredProcedure [dbo].[UpdateOrderProducts]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateOrderProducts]

/* 
 * PROCEDIMIENTO PARA ACTUALIZAR PRODUCTO DE UNA ORDEN
 * 
 * Parámetros:
 * @order_product_id - ID de la orden del producto a modificar
 * @product_id - ID del producto a agregar
 * @quantity - Cantidad del producto
 * @subtotal - Cantidad de productos * Precio individual
 * 
 * 
*/
	@order_details_id int,
	@product_id int,
	@quantity int
	
AS
	BEGIN
		DECLARE @subtotal decimal(10,2)
		DECLARE @price decimal(10,2)
		
		/* Variables de valores antiguos */
		DECLARE @pre_quantity int
		DECLARE @pre_total decimal(10,2)
		DECLARE @order_id int
		
		/* Obtenemos el precio individual y lo convertimos a nuestro subtotal */
		SELECT @price = price FROM products WHERE product_id = @product_id
		SET @subtotal = @price * @quantity
		
		/* Obtenemos el ID de la orden */
		SELECT @order_id = order_id FROM order_products WHERE order_details_id = @order_details_id 
		
		/* Valores antiguos */
		SELECT @pre_quantity = quantity FROM order_products WHERE order_details_id = @order_details_id
		SELECT @pre_total = total_price FROM orders WHERE order_id = @order_id
		
		/* Actualizamos orden del producto */
		UPDATE order_products SET 
			product_id = @product_id,
			quantity = @quantity,
			subtotal = @subtotal
		WHERE order_details_id = @order_details_id
		
		/* Actualizamos nuevo stock */
		UPDATE products SET stock = stock + @pre_quantity - @quantity WHERE product_id = @product_id
		/* Actualizamos nuevo total */
		UPDATE orders SET total_price = total_price - @pre_total + @subtotal WHERE order_id = @order_id
		
		SELECT * FROM order_products WHERE order_details_id = @order_details_id
		SELECT * FROM orders WHERE order_id = @order_id
	END
GO
/****** Object:  StoredProcedure [dbo].[UpdateOrderStatus]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateOrderStatus]

/* 
 * PROCEDIMIENTO PARA ACTUALIZAR EL ESTADO DE UNA ORDEN
 * 
 * Parámetros:
 * @order_id - ID de la orden
 * @status - Nuevo estado
 * 
 * Posibles estados:
 * 1. No procesado (Espera de un operador)
 * 2. Aceptado por el operador
 * 3. Rechazado por el operador
 * 4. Cancelado por el usuario
 * 5. Entregado
 * 
 * 
*/
	@order_id int,
	@status int
	
AS
	BEGIN
		UPDATE orders SET status_id = @status WHERE order_id = @order_id 	
		
		IF @status = 3 or @status = 4
		BEGIN
			UPDATE products 
			SET stock = stock + op.quantity
			FROM products p
			INNER JOIN order_products op ON p.product_id = op.product_id
			WHERE op.order_id = @order_id
		END
		
		EXEC LoadOrder @order_id = @order_id
	END
GO
/****** Object:  StoredProcedure [dbo].[UpdateProduct]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateProduct]

/* 
 * PROCEDIMIENTO PARA ACTUALIZAR UN PRODUCTO
 * 
 * Parámetros:
 * @name - Nombre 
 * @brand - Marca
 * @price - Precio
 * @stock - Stock existente
 * @category_id - Categoria
 * @code - Codigo de barras
 * 
 * 
*/
	@product_id int,
	@name varchar(100) = NULL,
	@brand varchar(50) = NULL,
	@price decimal(9) = NULL,
	@stock int = NULL,
	@category_id int = NULL,
	@code varchar(50) = NULL
	
AS
	BEGIN
		UPDATE products
		
		SET 
		
		name = COALESCE(@name, name),
		brand = COALESCE(@brand, brand),
		price = COALESCE(@price, price),
		stock = COALESCE(@stock, stock),
		category_id = COALESCE(@category_id, category_id),
		code = COALESCE(@code, code)
		WHERE product_id = @product_id
		
		SELECT * FROM products WHERE product_id = @product_id
	END

GO
/****** Object:  StoredProcedure [dbo].[UpdateProductStatus]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateProductStatus]

/* 
 * PROCEDIMIENTO PARA ACTUALIZAR EL ESTADO DEL PRODUCTO
 * 
 * Parámetros:
 * @product_id
 
 * 
*/
	@product_id int
AS
	BEGIN
		UPDATE products
		
		SET 
		is_disabled = is_disabled ^ 1
		WHERE product_id = @product_id
		
		SELECT * FROM products WHERE product_id = @product_id
	END

GO
/****** Object:  StoredProcedure [dbo].[UpdateUser]    Script Date: 06/01/2025 23:12:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateUser]

/* 
 * PROCEDIMIENTO PARA ACTUALIZAR UN USUARIO
 * 
 * Parámetros:
 * @user_id - ID de usuario
 * @email - Correo 
 * @full_name - Nombre completo
 * @phone - Telefono
 * @birthday - Fecha de nacimiento
 * @address - Direccion de entrega
 * 
 * 
*/
	@user_id INT,
	
	@email VARCHAR(100) = NULL,
	@full_name VARCHAR(50) = NULL,
	@phone VARCHAR(8) = NULL,
	@birthday DATE = NULL,
	@address VARCHAR(250) = NULL,
	@is_disabled BIT = NULL,
	@rol_id INT = NULL
	
AS
	BEGIN
		UPDATE users
		
		SET 
			email = COALESCE(@email, email),
			full_name = COALESCE(@full_name, full_name),
			phone = COALESCE(@phone, phone),
			birthday = COALESCE(@birthday, birthday),
			address = COALESCE(@address, address),
			is_disabled = COALESCE(@is_disabled, is_disabled),
			rol_id = COALESCE(@rol_id, rol_id)
		WHERE user_id = @user_id
		
		SELECT * FROM users WHERE user_id = @user_id
	END
GO
USE [master]
GO
ALTER DATABASE [GDA00448_OT_JonathanBarrios] SET  READ_WRITE 
GO
