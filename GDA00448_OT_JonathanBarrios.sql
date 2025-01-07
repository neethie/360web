USE [GDA00448_OT_JonathanBarrios]
GO
/****** Object:  Table [dbo].[products]    Script Date: 06/01/2025 21:26:08 ******/
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
/****** Object:  View [dbo].[ActiveAvailableProducts]    Script Date: 06/01/2025 21:26:08 ******/
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
/****** Object:  Table [dbo].[orders]    Script Date: 06/01/2025 21:26:08 ******/
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
/****** Object:  View [dbo].[TotalInAugust2024]    Script Date: 06/01/2025 21:26:08 ******/
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
/****** Object:  Table [dbo].[order_products]    Script Date: 06/01/2025 21:26:08 ******/
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
/****** Object:  View [dbo].[TopTenProducts]    Script Date: 06/01/2025 21:26:08 ******/
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
/****** Object:  Table [dbo].[users]    Script Date: 06/01/2025 21:26:08 ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[TopTenClients]    Script Date: 06/01/2025 21:26:08 ******/
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
/****** Object:  Table [dbo].[categories]    Script Date: 06/01/2025 21:26:08 ******/
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
/****** Object:  Table [dbo].[roles]    Script Date: 06/01/2025 21:26:08 ******/
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
/****** Object:  Table [dbo].[status]    Script Date: 06/01/2025 21:26:08 ******/
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
SET IDENTITY_INSERT [dbo].[categories] ON 

INSERT [dbo].[categories] ([category_id], [name], [is_disabled]) VALUES (1, N'General', 0)
INSERT [dbo].[categories] ([category_id], [name], [is_disabled]) VALUES (2, N'Categoria de Prueba 2', 0)
INSERT [dbo].[categories] ([category_id], [name], [is_disabled]) VALUES (3, N'Computadoras', 1)
INSERT [dbo].[categories] ([category_id], [name], [is_disabled]) VALUES (4, N'Refrigeradores', 0)
INSERT [dbo].[categories] ([category_id], [name], [is_disabled]) VALUES (5, N'Mouses', 0)
INSERT [dbo].[categories] ([category_id], [name], [is_disabled]) VALUES (6, N'Creando categoria desde postman', 0)
INSERT [dbo].[categories] ([category_id], [name], [is_disabled]) VALUES (9, N'Editando Categoria desde React', 1)
INSERT [dbo].[categories] ([category_id], [name], [is_disabled]) VALUES (10, N'Creando categoria desde React', 0)
INSERT [dbo].[categories] ([category_id], [name], [is_disabled]) VALUES (11, N'Probando autorizacion', 0)
SET IDENTITY_INSERT [dbo].[categories] OFF
GO
SET IDENTITY_INSERT [dbo].[order_products] ON 

INSERT [dbo].[order_products] ([order_details_id], [order_id], [product_id], [quantity], [subtotal]) VALUES (7, 4, 1, 1, CAST(5000 AS Decimal(38, 0)))
INSERT [dbo].[order_products] ([order_details_id], [order_id], [product_id], [quantity], [subtotal]) VALUES (8, 4, 5, 1, CAST(800 AS Decimal(38, 0)))
INSERT [dbo].[order_products] ([order_details_id], [order_id], [product_id], [quantity], [subtotal]) VALUES (9, 5, 4, 1, CAST(5500 AS Decimal(38, 0)))
INSERT [dbo].[order_products] ([order_details_id], [order_id], [product_id], [quantity], [subtotal]) VALUES (10, 6, 2, 2, CAST(400 AS Decimal(38, 0)))
INSERT [dbo].[order_products] ([order_details_id], [order_id], [product_id], [quantity], [subtotal]) VALUES (11, 8, 1, 1, CAST(5000 AS Decimal(38, 0)))
INSERT [dbo].[order_products] ([order_details_id], [order_id], [product_id], [quantity], [subtotal]) VALUES (13, 46, 1, 1, CAST(5000 AS Decimal(38, 0)))
INSERT [dbo].[order_products] ([order_details_id], [order_id], [product_id], [quantity], [subtotal]) VALUES (14, 46, 2, 1, CAST(200 AS Decimal(38, 0)))
INSERT [dbo].[order_products] ([order_details_id], [order_id], [product_id], [quantity], [subtotal]) VALUES (15, 47, 5, 1, CAST(800 AS Decimal(38, 0)))
INSERT [dbo].[order_products] ([order_details_id], [order_id], [product_id], [quantity], [subtotal]) VALUES (16, 48, 1, 1, CAST(5000 AS Decimal(38, 0)))
INSERT [dbo].[order_products] ([order_details_id], [order_id], [product_id], [quantity], [subtotal]) VALUES (17, 49, 1, 1, CAST(5000 AS Decimal(38, 0)))
SET IDENTITY_INSERT [dbo].[order_products] OFF
GO
SET IDENTITY_INSERT [dbo].[orders] ON 

INSERT [dbo].[orders] ([order_id], [user_id], [date_creation], [status_id], [total_price], [address], [client_name], [client_phone], [details]) VALUES (4, 3, CAST(N'2024-08-20T13:31:03.870' AS DateTime), 3, CAST(5000 AS Decimal(38, 0)), NULL, NULL, NULL, NULL)
INSERT [dbo].[orders] ([order_id], [user_id], [date_creation], [status_id], [total_price], [address], [client_name], [client_phone], [details]) VALUES (5, 3, CAST(N'2024-08-24T13:42:01.570' AS DateTime), 2, CAST(5500 AS Decimal(38, 0)), NULL, NULL, NULL, NULL)
INSERT [dbo].[orders] ([order_id], [user_id], [date_creation], [status_id], [total_price], [address], [client_name], [client_phone], [details]) VALUES (6, 4, CAST(N'2024-12-08T21:06:38.330' AS DateTime), 2, CAST(400 AS Decimal(38, 0)), NULL, NULL, NULL, NULL)
INSERT [dbo].[orders] ([order_id], [user_id], [date_creation], [status_id], [total_price], [address], [client_name], [client_phone], [details]) VALUES (7, 4, CAST(N'2024-12-20T23:24:33.570' AS DateTime), 2, CAST(0 AS Decimal(38, 0)), NULL, NULL, NULL, NULL)
INSERT [dbo].[orders] ([order_id], [user_id], [date_creation], [status_id], [total_price], [address], [client_name], [client_phone], [details]) VALUES (8, 4, CAST(N'2024-12-20T23:26:45.513' AS DateTime), 2, CAST(5000 AS Decimal(38, 0)), NULL, NULL, NULL, NULL)
INSERT [dbo].[orders] ([order_id], [user_id], [date_creation], [status_id], [total_price], [address], [client_name], [client_phone], [details]) VALUES (40, 8, CAST(N'2025-01-06T15:51:51.620' AS DateTime), 1, CAST(0 AS Decimal(38, 0)), N'Admin direccion', N'admin', N'12345678', NULL)
INSERT [dbo].[orders] ([order_id], [user_id], [date_creation], [status_id], [total_price], [address], [client_name], [client_phone], [details]) VALUES (41, 8, CAST(N'2025-01-06T17:10:10.653' AS DateTime), 1, CAST(0 AS Decimal(38, 0)), N'Admin direccion', N'admin', N'12345678', NULL)
INSERT [dbo].[orders] ([order_id], [user_id], [date_creation], [status_id], [total_price], [address], [client_name], [client_phone], [details]) VALUES (42, 8, CAST(N'2025-01-06T17:10:39.110' AS DateTime), 1, CAST(0 AS Decimal(38, 0)), N'Admin direccion', N'admin', N'12345678', NULL)
INSERT [dbo].[orders] ([order_id], [user_id], [date_creation], [status_id], [total_price], [address], [client_name], [client_phone], [details]) VALUES (43, 8, CAST(N'2025-01-06T17:11:08.613' AS DateTime), 1, CAST(0 AS Decimal(38, 0)), N'Admin direccion', N'admin', N'12345678', NULL)
INSERT [dbo].[orders] ([order_id], [user_id], [date_creation], [status_id], [total_price], [address], [client_name], [client_phone], [details]) VALUES (44, 8, CAST(N'2025-01-06T17:11:38.340' AS DateTime), 1, CAST(0 AS Decimal(38, 0)), N'Admin direccion', N'admin', N'12345678', NULL)
INSERT [dbo].[orders] ([order_id], [user_id], [date_creation], [status_id], [total_price], [address], [client_name], [client_phone], [details]) VALUES (45, 8, CAST(N'2025-01-06T17:43:55.957' AS DateTime), 1, CAST(0 AS Decimal(38, 0)), N'Admin direccion', N'admin', N'12345678', NULL)
INSERT [dbo].[orders] ([order_id], [user_id], [date_creation], [status_id], [total_price], [address], [client_name], [client_phone], [details]) VALUES (46, 8, CAST(N'2025-01-06T17:45:58.317' AS DateTime), 1, CAST(5200 AS Decimal(38, 0)), N'Admin direccion', N'admin', N'12345678', NULL)
INSERT [dbo].[orders] ([order_id], [user_id], [date_creation], [status_id], [total_price], [address], [client_name], [client_phone], [details]) VALUES (47, 8, CAST(N'2025-01-06T18:00:05.297' AS DateTime), 1, CAST(800 AS Decimal(38, 0)), N'Admin direccion', N'admin', N'12345678', NULL)
INSERT [dbo].[orders] ([order_id], [user_id], [date_creation], [status_id], [total_price], [address], [client_name], [client_phone], [details]) VALUES (48, 8, CAST(N'2025-01-06T18:00:44.240' AS DateTime), 2, CAST(5000 AS Decimal(38, 0)), N'Admin direccion', N'admin', N'12345678', NULL)
INSERT [dbo].[orders] ([order_id], [user_id], [date_creation], [status_id], [total_price], [address], [client_name], [client_phone], [details]) VALUES (49, 21, CAST(N'2025-01-06T21:05:01.110' AS DateTime), 4, CAST(5000 AS Decimal(38, 0)), N'casa #1', N'ajsfkjklasfjklafs', N'12345678', NULL)
SET IDENTITY_INSERT [dbo].[orders] OFF
GO
SET IDENTITY_INSERT [dbo].[products] ON 

INSERT [dbo].[products] ([product_id], [name], [brand], [price], [stock], [category_id], [code], [date_creation], [image_url], [is_disabled]) VALUES (1, N'LAPTOP Ryzen 3 3300U', N'ACER', CAST(5000.00 AS Decimal(10, 2)), 3, 1, N'abcd', CAST(N'2024-12-07T23:13:14.903' AS DateTime), N'http://localhost:4000/public/product_1.png', 0)
INSERT [dbo].[products] ([product_id], [name], [brand], [price], [stock], [category_id], [code], [date_creation], [image_url], [is_disabled]) VALUES (2, N'Mouse g203', N'Logitech', CAST(200.00 AS Decimal(10, 2)), 7, 5, N'abcd', CAST(N'2024-12-07T23:13:32.410' AS DateTime), N'http://localhost:4000/public/product_2.png', 0)
INSERT [dbo].[products] ([product_id], [name], [brand], [price], [stock], [category_id], [code], [date_creation], [image_url], [is_disabled]) VALUES (3, N'Teclado mecánico', N'Redragon', CAST(300.00 AS Decimal(10, 2)), 10, 2, N'abcd', CAST(N'2024-12-07T23:13:41.783' AS DateTime), N'http://localhost:4000/public/product_3.png', 0)
INSERT [dbo].[products] ([product_id], [name], [brand], [price], [stock], [category_id], [code], [date_creation], [image_url], [is_disabled]) VALUES (4, N'LAPTOP Ryzen 5 3500U', N'HPE', CAST(5500.00 AS Decimal(10, 2)), 4, 1, N'HP350U', CAST(N'2024-12-07T23:44:41.670' AS DateTime), N'http://localhost:4000/public/product_4.png', 0)
INSERT [dbo].[products] ([product_id], [name], [brand], [price], [stock], [category_id], [code], [date_creation], [image_url], [is_disabled]) VALUES (5, N'REFRIGERADOR MABE 300', N'MABE', CAST(800.00 AS Decimal(10, 2)), 5, 4, N'MB0129', CAST(N'2024-12-07T23:46:44.127' AS DateTime), N'http://localhost:4000/public/product_5.png', 0)
INSERT [dbo].[products] ([product_id], [name], [brand], [price], [stock], [category_id], [code], [date_creation], [image_url], [is_disabled]) VALUES (6, N'Procesador Ryzen 5 5600G', N'AMD', CAST(500.00 AS Decimal(10, 2)), 5, 1, N'fbd653', CAST(N'2024-12-15T22:36:23.653' AS DateTime), NULL, 0)
INSERT [dbo].[products] ([product_id], [name], [brand], [price], [stock], [category_id], [code], [date_creation], [image_url], [is_disabled]) VALUES (9, N'Procesador Ryzen 3 3300G', N'AMD', CAST(500.00 AS Decimal(10, 2)), 5, 1, N'fbd653', CAST(N'2024-12-15T22:45:24.240' AS DateTime), NULL, 0)
INSERT [dbo].[products] ([product_id], [name], [brand], [price], [stock], [category_id], [code], [date_creation], [image_url], [is_disabled]) VALUES (11, N'Editando desde React', N'React', CAST(12.00 AS Decimal(10, 2)), 24, 6, N'asjkf123', CAST(N'2024-12-19T18:25:47.223' AS DateTime), NULL, 0)
INSERT [dbo].[products] ([product_id], [name], [brand], [price], [stock], [category_id], [code], [date_creation], [image_url], [is_disabled]) VALUES (12, N'Producto desde React', N'React', CAST(2000.00 AS Decimal(10, 2)), 12, 2, NULL, CAST(N'2025-01-01T20:19:05.790' AS DateTime), NULL, 0)
INSERT [dbo].[products] ([product_id], [name], [brand], [price], [stock], [category_id], [code], [date_creation], [image_url], [is_disabled]) VALUES (13, N'Producto desde React 3', N'React 2', CAST(2000.00 AS Decimal(10, 2)), 12, 2, NULL, CAST(N'2025-01-01T20:20:34.327' AS DateTime), NULL, 0)
INSERT [dbo].[products] ([product_id], [name], [brand], [price], [stock], [category_id], [code], [date_creation], [image_url], [is_disabled]) VALUES (24, N'Imagen', N'imagen', CAST(12.00 AS Decimal(10, 2)), 12, 2, NULL, CAST(N'2025-01-04T19:27:58.373' AS DateTime), N'C:\Users\jonat\OneDrive\Desktop\proyects\Desafio\server\public\products\product_24.png', 0)
INSERT [dbo].[products] ([product_id], [name], [brand], [price], [stock], [category_id], [code], [date_creation], [image_url], [is_disabled]) VALUES (25, N'Imagen', N'imagen', CAST(12.00 AS Decimal(10, 2)), 12, 3, NULL, CAST(N'2025-01-04T19:30:12.107' AS DateTime), N'C:\Users\jonat\OneDrive\Desktop\proyects\Desafio\server\public\product_25.png', 0)
INSERT [dbo].[products] ([product_id], [name], [brand], [price], [stock], [category_id], [code], [date_creation], [image_url], [is_disabled]) VALUES (26, N'Test', N'test', CAST(1212.00 AS Decimal(10, 2)), 12, 3, NULL, CAST(N'2025-01-04T19:42:12.553' AS DateTime), N'http://localhost:4000/public/product_26.png', 0)
SET IDENTITY_INSERT [dbo].[products] OFF
GO
SET IDENTITY_INSERT [dbo].[roles] ON 

INSERT [dbo].[roles] ([rol_id], [name], [permissions]) VALUES (1, N'Cliente', 0)
INSERT [dbo].[roles] ([rol_id], [name], [permissions]) VALUES (2, N'Operador', 1)
INSERT [dbo].[roles] ([rol_id], [name], [permissions]) VALUES (3, N'Administrador', 2)
SET IDENTITY_INSERT [dbo].[roles] OFF
GO
SET IDENTITY_INSERT [dbo].[status] ON 

INSERT [dbo].[status] ([status_id], [name]) VALUES (1, N'Pendiente de Operador')
INSERT [dbo].[status] ([status_id], [name]) VALUES (2, N'Aceptado')
INSERT [dbo].[status] ([status_id], [name]) VALUES (3, N'Rechazado')
INSERT [dbo].[status] ([status_id], [name]) VALUES (4, N'Cancelado')
SET IDENTITY_INSERT [dbo].[status] OFF
GO
SET IDENTITY_INSERT [dbo].[users] ON 

INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [birthday], [date_creation], [address], [rol_id], [is_disabled]) VALUES (1, N'actualizarcorreo@post.com', N'hoola', N'Post Man Prueba', N'41212166', CAST(N'2024-01-01' AS Date), CAST(N'2024-12-06T14:50:31.087' AS DateTime), N'Dirección', 1, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [birthday], [date_creation], [address], [rol_id], [is_disabled]) VALUES (2, N'correoa2@gmail.com', N'hoola', N'Jonathan', N'41212166', CAST(N'2024-01-01' AS Date), CAST(N'2024-12-06T14:50:38.017' AS DateTime), N'Dirección', 1, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [birthday], [date_creation], [address], [rol_id], [is_disabled]) VALUES (3, N'jonny@gmail.com', N'fdb65333', N'Jonathan Morales', N'41612166', CAST(N'2024-08-01' AS Date), CAST(N'2024-12-07T23:37:19.203' AS DateTime), N'Dirección', 1, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [birthday], [date_creation], [address], [rol_id], [is_disabled]) VALUES (4, N'correo2@mmail.com', N'1jkfaslkj', N'Karen Jasmin', N'12439112', CAST(N'2006-01-03' AS Date), CAST(N'2024-12-08T21:04:44.047' AS DateTime), N'Dirección', 1, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [birthday], [date_creation], [address], [rol_id], [is_disabled]) VALUES (5, N'correo3@mail.com', N'asfjajsfk8998', N'Principe Diaz', N'99987788', CAST(N'2003-01-10' AS Date), CAST(N'2024-12-08T21:05:28.940' AS DateTime), N'Dirección', 1, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [birthday], [date_creation], [address], [rol_id], [is_disabled]) VALUES (6, N'jonnathann@gjj.com', N'$2b$10$Sr3D5M1c65NrAvKXm237c.i/AgdeImtP1x.l53cPO1fBVQ3IAiGba', N'Administrador', N'41212166', CAST(N'2005-01-08' AS Date), CAST(N'2024-12-15T22:16:36.820' AS DateTime), N'Dirección', 3, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [birthday], [date_creation], [address], [rol_id], [is_disabled]) VALUES (7, N'user@react.com', N'$2b$10$ipuadmDkyDD.bhuAfWfXwewU3ADlEi1tAfGf7zCKbhIcwyv3yKQcq', N'Desde React', N'12345678', CAST(N'2000-01-01' AS Date), CAST(N'2025-01-01T20:49:22.180' AS DateTime), NULL, 3, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [birthday], [date_creation], [address], [rol_id], [is_disabled]) VALUES (8, N'admin@admin.com', N'$2b$10$GY7Tf1/cYYisFgELkgyAl.00ZvUht0pRxFTWn8GdFX28s5TmWGsxy', N'admin', N'12345678', CAST(N'2000-01-01' AS Date), CAST(N'2025-01-01T21:00:38.780' AS DateTime), N'Admin direccion', 3, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [birthday], [date_creation], [address], [rol_id], [is_disabled]) VALUES (9, N'desdeformregister@correo.com', N'$2b$10$lgapDJanT/L/YU868Gipj.chEPLKw0GA1tXI8AHuqNsIZUMOCs9Tu', N'Cuenta Prueba', N'12345678', CAST(N'2005-01-08' AS Date), CAST(N'2025-01-01T22:07:46.833' AS DateTime), N'Mi casa ', 1, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [birthday], [date_creation], [address], [rol_id], [is_disabled]) VALUES (10, N'cuenta1@prueba.com', N'$2b$10$k/fJ2jjWK0.Pt4rqJkNace1C2CRRzlg8zSOn1s/dWJDAVPEnP4AHq', N'Usuario', N'12345678', CAST(N'2005-01-01' AS Date), CAST(N'2025-01-01T22:10:29.747' AS DateTime), N'asffasafs', 1, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [birthday], [date_creation], [address], [rol_id], [is_disabled]) VALUES (11, N'asffas@asfas.com', N'$2b$10$Al5TborcwfOgx2IoZ6jRGO8beZ3LjS.u.q4TDKd/YdQoMsVY6dgnq', N'Usuario', N'12345678', CAST(N'2000-01-01' AS Date), CAST(N'2025-01-01T22:11:24.340' AS DateTime), N'asfasasfasf', 1, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [birthday], [date_creation], [address], [rol_id], [is_disabled]) VALUES (12, N'userasfjk@faksjl.com', N'$2b$10$aWqgBGAEKoUuz5ah1xkO7.nkaCPFi7uFCHclu49Z9kls5DyK6gJlu', N'asfjkasfjkllkj', N'12345678', CAST(N'2000-01-01' AS Date), CAST(N'2025-01-01T22:12:17.293' AS DateTime), N'ausau', 1, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [birthday], [date_creation], [address], [rol_id], [is_disabled]) VALUES (13, N'us2erasfjk@faksjl.com', N'$2b$10$ZqpWulerMMO816L49CQa1uG3YbQaIeA1Gnhc.A6nNJSsDrzrWIEaS', N'asfjkasfjkllkj', N'12345678', CAST(N'2000-01-01' AS Date), CAST(N'2025-01-01T22:12:48.710' AS DateTime), N'ausau', 1, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [birthday], [date_creation], [address], [rol_id], [is_disabled]) VALUES (14, N'usuariotemp@temp.com', N'$2b$10$o2ZSFNQ9Mdmzhv9ciSWwpetkZAglSXtAp5gTCebYcb5RxiaCATxvC', N'Usuario Temporal', N'12345678', CAST(N'2001-01-01' AS Date), CAST(N'2025-01-01T22:15:27.503' AS DateTime), N'Direccion', 1, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [birthday], [date_creation], [address], [rol_id], [is_disabled]) VALUES (15, N'user@user.com', N'$2b$10$IG2m5p2R8ZrB8oLtF4KgGugmAV2yXWIUxouB.TVJ41Ri/F5uYCjIi', N'Usuario', N'12345678', CAST(N'2005-01-08' AS Date), CAST(N'2025-01-02T20:23:11.833' AS DateTime), N'Direccion usuario', 1, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [birthday], [date_creation], [address], [rol_id], [is_disabled]) VALUES (16, N'admin2@admin.com', N'$2b$10$eDCMwD4F61d2kw4754imkeH1QSrlanNsfx5bOPdIO3eMcAMOsuYce', N'Admin', N'12345678', CAST(N'2005-01-08' AS Date), CAST(N'2025-01-06T20:53:14.877' AS DateTime), N'Direccion 1 Ciudad de Guatemala', 1, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [birthday], [date_creation], [address], [rol_id], [is_disabled]) VALUES (17, N'admin3@admin.com', N'$2b$10$K3OMrIza/3IBjPL77x64A.EZXhKORgvsgUJXQ74eXp3nSV1WlSpjq', N'admin', N'12345678', CAST(N'2005-01-08' AS Date), CAST(N'2025-01-06T20:55:14.643' AS DateTime), N'Casa avenida#7 Ciudad de Guatemala', 1, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [birthday], [date_creation], [address], [rol_id], [is_disabled]) VALUES (18, N'adminnuevo@admin.com', N'$2b$10$b7O0E/xL33ZwRZsqkl.jmui3ou57IszO4Ikn/Cc27YXg7W6rDksYm', N'admin', N'12345678', CAST(N'2005-01-08' AS Date), CAST(N'2025-01-06T20:55:36.117' AS DateTime), N'Casa avenida#7 Ciudad de Guatemala', 1, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [birthday], [date_creation], [address], [rol_id], [is_disabled]) VALUES (19, N'nuevoadmin@admin.com', N'$2b$10$oD1mkh.WkPGZPejcve3vPukaf06m5kn8bF8Lo./Mzuk3y4uTfS5Bq', N'admin', N'12345678', CAST(N'2005-01-08' AS Date), CAST(N'2025-01-06T20:56:01.517' AS DateTime), N'Casa avenida#7 Ciudad de Guatemala', 1, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [birthday], [date_creation], [address], [rol_id], [is_disabled]) VALUES (20, N'ajfskljflka@asjfkljasf.com', N'$2b$10$46nJhu9hUaRQpA2SmQ7FeeYTy.VIfCmCOKvTCrTGrC5viPCCRgOOa', N'kaslfjl', N'12345678', CAST(N'2005-01-08' AS Date), CAST(N'2025-01-06T20:56:48.487' AS DateTime), N'fjakkajlsf', 1, 0)
INSERT [dbo].[users] ([user_id], [email], [password], [full_name], [phone], [birthday], [date_creation], [address], [rol_id], [is_disabled]) VALUES (21, N'asfjfsakljasfklj@afjskkljasfkjl.com', N'$2b$10$kqPn3Jq3Dp0pmVQ/VB8AFemuDvmh/dL11o6H/UleqJGjEnbj9oB7a', N'ajsfkjklasfjklafs', N'12345678', CAST(N'2005-01-08' AS Date), CAST(N'2025-01-06T20:58:36.850' AS DateTime), N'casa #1', 1, 0)
SET IDENTITY_INSERT [dbo].[users] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__users__AB6E6164647E23B1]    Script Date: 06/01/2025 21:26:09 ******/
ALTER TABLE [dbo].[users] ADD UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
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
/****** Object:  StoredProcedure [dbo].[CheckProductStock]    Script Date: 06/01/2025 21:26:09 ******/
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
/****** Object:  StoredProcedure [dbo].[CreateOrder]    Script Date: 06/01/2025 21:26:09 ******/
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

		EXEC LoadOrder @order_id = @order_id
		
	END
GO
/****** Object:  StoredProcedure [dbo].[CreateOrderProducts]    Script Date: 06/01/2025 21:26:09 ******/
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
/****** Object:  StoredProcedure [dbo].[CreateProduct]    Script Date: 06/01/2025 21:26:09 ******/
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
/****** Object:  StoredProcedure [dbo].[CreateProductCategory]    Script Date: 06/01/2025 21:26:09 ******/
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
/****** Object:  StoredProcedure [dbo].[CreateUser]    Script Date: 06/01/2025 21:26:09 ******/
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
/****** Object:  StoredProcedure [dbo].[LoadAllProducts]    Script Date: 06/01/2025 21:26:09 ******/
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
/****** Object:  StoredProcedure [dbo].[LoadOrder]    Script Date: 06/01/2025 21:26:09 ******/
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
/****** Object:  StoredProcedure [dbo].[LoadOrderDetailsByMaster]    Script Date: 06/01/2025 21:26:09 ******/
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
/****** Object:  StoredProcedure [dbo].[LoadOrders]    Script Date: 06/01/2025 21:26:09 ******/
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
/****** Object:  StoredProcedure [dbo].[LoadOrdersByUser]    Script Date: 06/01/2025 21:26:09 ******/
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
/****** Object:  StoredProcedure [dbo].[LoadProductByCode]    Script Date: 06/01/2025 21:26:09 ******/
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
/****** Object:  StoredProcedure [dbo].[LoadProducts]    Script Date: 06/01/2025 21:26:09 ******/
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
/****** Object:  StoredProcedure [dbo].[LoadTopProducts]    Script Date: 06/01/2025 21:26:09 ******/
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
/****** Object:  StoredProcedure [dbo].[LoadUserData]    Script Date: 06/01/2025 21:26:09 ******/
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
/****** Object:  StoredProcedure [dbo].[LoadUserPassword]    Script Date: 06/01/2025 21:26:09 ******/
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
/****** Object:  StoredProcedure [dbo].[LoadUsersData]    Script Date: 06/01/2025 21:26:09 ******/
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
/****** Object:  StoredProcedure [dbo].[UpdateCategory]    Script Date: 06/01/2025 21:26:09 ******/
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
/****** Object:  StoredProcedure [dbo].[UpdateCategoryStatus]    Script Date: 06/01/2025 21:26:09 ******/
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
	@category_id int = NULL,
	@name VARCHAR(50) = NULL,
	@is_disabled bit
AS
	BEGIN
		DECLARE @new_category_id int
		
		IF @category_id IS NULL
			SELECT @new_category_id as category_id FROM categories WHERE name = @name
		ELSE
			SET @new_category_id = @category_id
		
			
		UPDATE products
		SET category_id = 1 
		WHERE category_id = @new_category_id
		
		UPDATE categories SET is_disabled = @is_disabled WHERE category_id = @new_category_id

		SELECT * FROM categories WHERE category_id = @new_category_id
	END

GO
/****** Object:  StoredProcedure [dbo].[UpdateOrderProducts]    Script Date: 06/01/2025 21:26:09 ******/
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
/****** Object:  StoredProcedure [dbo].[UpdateOrderStatus]    Script Date: 06/01/2025 21:26:09 ******/
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
/****** Object:  StoredProcedure [dbo].[UpdateProduct]    Script Date: 06/01/2025 21:26:09 ******/
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
/****** Object:  StoredProcedure [dbo].[UpdateProductStatus]    Script Date: 06/01/2025 21:26:09 ******/
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
 * @status
 * 
 * Posibles estados:
 * 0. Deshabilitado
 * 1. Habilitado
 
 * 
*/
	@product_id int,
	@status bit
AS
	BEGIN
		UPDATE products
		
		SET 
		is_disabled = 1 - @status
		WHERE product_id = @product_id
		
		SELECT * FROM products WHERE product_id = @product_id
	END

GO
/****** Object:  StoredProcedure [dbo].[UpdateUser]    Script Date: 06/01/2025 21:26:09 ******/
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
	@address VARCHAR(250) = NULL
	
AS
	BEGIN
		UPDATE users
		
		SET 
			email = COALESCE(@email, email),
			full_name = COALESCE(@full_name, full_name),
			phone = COALESCE(@phone, phone),
			birthday = COALESCE(@birthday, birthday),
			address = COALESCE(@address, address)
		WHERE user_id = @user_id
		
		SELECT * FROM users WHERE user_id = @user_id
	END
GO
