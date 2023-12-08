-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Дек 08 2023 г., 12:40
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `module_b`
--

-- --------------------------------------------------------

--
-- Структура таблицы `employees_at_work_shift`
--

CREATE TABLE `employees_at_work_shift` (
  `work_shift_id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `id_user` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `employees_at_work_shift`
--

INSERT INTO `employees_at_work_shift` (`work_shift_id`, `user_id`, `id_user`) VALUES
(1, 1, 1),
(1, 2, 2),
(1, 3, 3),
(2, 2, 1),
(2, 3, 2),
(2, 1, 3),
(5, 5, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `groups`
--

CREATE TABLE `groups` (
  `group_id` tinyint UNSIGNED NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `groups`
--

INSERT INTO `groups` (`group_id`, `name`) VALUES
(1, 'Admin'),
(3, 'Cook'),
(2, 'Waiter');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `work_shift_id` int UNSIGNED NOT NULL,
  `order_id` int UNSIGNED NOT NULL,
  `table_id` tinyint UNSIGNED NOT NULL COMMENT 'number',
  `user_id` int UNSIGNED NOT NULL COMMENT 'shift_workers',
  `create_at` datetime NOT NULL,
  `order_status_id` tinyint UNSIGNED NOT NULL DEFAULT '1',
  `price` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`work_shift_id`, `order_id`, `table_id`, `user_id`, `create_at`, `order_status_id`, `price`) VALUES
(1, 1, 1, 2, '2023-12-04 16:18:07', 5, 2934),
(1, 2, 2, 2, '2023-12-04 17:18:07', 5, 0),
(1, 3, 4, 2, '2023-12-03 19:53:25', 1, 0),
(1, 4, 2, 2, '2023-12-03 19:53:47', 4, 0),
(1, 5, 2, 2, '2023-12-03 19:54:54', 1, 0),
(1, 6, 5, 2, '2023-12-03 19:55:05', 1, 0),
(2, 8, 3, 2, '2023-12-04 12:18:19', 3, 0),
(2, 9, 2, 2, '2023-12-04 12:44:38', 1, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `order_statuses`
--

CREATE TABLE `order_statuses` (
  `order_status_id` tinyint UNSIGNED NOT NULL,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `order_statuses`
--

INSERT INTO `order_statuses` (`order_status_id`, `name`) VALUES
(1, 'accepted'),
(2, 'canceled'),
(3, 'ready'),
(4, 'paid-up'),
(5, 'preparing');

-- --------------------------------------------------------

--
-- Структура таблицы `positions`
--

CREATE TABLE `positions` (
  `order_id` int UNSIGNED NOT NULL,
  `position_id` int UNSIGNED NOT NULL,
  `count` smallint UNSIGNED NOT NULL,
  `position` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `positions`
--

INSERT INTO `positions` (`order_id`, `position_id`, `count`, `position`, `price`) VALUES
(1, 1, 5, 'Aut sit ut et reprehenderit sed cumque.', 8135),
(1, 2, 1, 'Ut similique dolorum eos culpa officiis.', 1993);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `user_id` int UNSIGNED NOT NULL,
  `name` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `surname` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `patronymic` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `login` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `photo_file` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user.png',
  `group_id` tinyint UNSIGNED NOT NULL,
  `status_id` tinyint UNSIGNED NOT NULL DEFAULT '2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`user_id`, `name`, `surname`, `patronymic`, `login`, `password`, `photo_file`, `group_id`, `status_id`) VALUES
(1, 'Victor', 'Osipov', NULL, 'fimdi', 'vios', 'user.png', 1, 1),
(2, 'Dimon', NULL, NULL, 'dim', '123', 'user.png', 2, 2),
(3, 'Vasya', NULL, NULL, 'vas', '12345', 'user.png', 3, 2),
(4, 'Sasha', NULL, NULL, 'sah', 'gg', 'user.png', 2, 2),
(5, 'Petya', NULL, NULL, 'pet', 'qwerty', 'user.png', 2, 2),
(6, 'Lena', NULL, NULL, 'len', 'img', 'R-MeUrlseL6Aj3Mf58-L5kuj.png', 3, 2),
(7, 'Test', NULL, NULL, 'test', 'img', '1Oge_W-jGqO3lCPewXkTa9Ap.jpg', 3, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `user_statuses`
--

CREATE TABLE `user_statuses` (
  `status_id` tinyint UNSIGNED NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `user_statuses`
--

INSERT INTO `user_statuses` (`status_id`, `name`) VALUES
(1, 'working'),
(2, 'vacationer');

-- --------------------------------------------------------

--
-- Структура таблицы `user_tokens`
--

CREATE TABLE `user_tokens` (
  `user_token` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  `group_id` tinyint UNSIGNED NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `user_tokens`
--

INSERT INTO `user_tokens` (`user_token`, `user_id`, `group_id`, `created_at`) VALUES
('EsWoerk%FuSJBbJWU5sY%j7WuNNgDFrlCMHwO@c-K4NTGquf-WMJBXc#T8!f9mstT-DcVX', 1, 1, '2023-12-03 19:21:36'),
('WlXX2GsuVi-lVStccPqES!OH$t5MjRrcEpsv@Foz66RXCtjll%fMbaLj1aoxHJib4Cy0K8', 2, 2, '2023-12-03 20:28:52'),
('PRoH76NnOM5JMBGn2si@Vp1HPRxLKi@XXX6u5S4uSXVz@z@bJKYf-rqy%XRgqLc-OJFmnI', 3, 3, '2023-12-05 09:40:54'),
('lgXlL1$xsHvp2dGO$%FKkkwqAOo6@NmTvMFh1DHw0fhy070-Hon1l-yOjQvaRW9M6giVa$', 4, 2, '2023-12-03 19:57:21');

-- --------------------------------------------------------

--
-- Структура таблицы `work_shifts`
--

CREATE TABLE `work_shifts` (
  `work_shift_id` int UNSIGNED NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `work_shifts`
--

INSERT INTO `work_shifts` (`work_shift_id`, `start`, `end`, `active`) VALUES
(1, '2023-12-04 08:00:00', '2023-12-04 17:00:00', 1),
(2, '2023-12-05 08:00:00', '2023-12-05 17:00:00', 0),
(3, '2023-12-06 08:00:00', '2023-12-06 17:00:00', 0),
(4, '2023-12-07 08:00:00', '2023-12-07 17:00:00', 0),
(5, '2023-12-08 08:00:00', '2023-12-08 17:00:00', 0),
(6, '2024-03-26 08:00:00', '2024-03-26 17:00:00', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `employees_at_work_shift`
--
ALTER TABLE `employees_at_work_shift`
  ADD KEY `work_shift_id` (`work_shift_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`),
  ADD UNIQUE KEY `GROUP_NAME` (`name`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `work_shift_id` (`work_shift_id`),
  ADD KEY `order_status_id` (`order_status_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `order_statuses`
--
ALTER TABLE `order_statuses`
  ADD PRIMARY KEY (`order_status_id`);

--
-- Индексы таблицы `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`position_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `login` (`login`),
  ADD KEY `user_status` (`status_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Индексы таблицы `user_statuses`
--
ALTER TABLE `user_statuses`
  ADD PRIMARY KEY (`status_id`);

--
-- Индексы таблицы `user_tokens`
--
ALTER TABLE `user_tokens`
  ADD UNIQUE KEY `user_id_2` (`user_id`),
  ADD UNIQUE KEY `user_token` (`user_token`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `work_shifts`
--
ALTER TABLE `work_shifts`
  ADD PRIMARY KEY (`work_shift_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` tinyint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `work_shifts`
--
ALTER TABLE `work_shifts`
  MODIFY `work_shift_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `employees_at_work_shift`
--
ALTER TABLE `employees_at_work_shift`
  ADD CONSTRAINT `employees_at_work_shift_ibfk_1` FOREIGN KEY (`work_shift_id`) REFERENCES `work_shifts` (`work_shift_id`),
  ADD CONSTRAINT `employees_at_work_shift_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`order_status_id`) REFERENCES `order_statuses` (`order_status_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`work_shift_id`) REFERENCES `work_shifts` (`work_shift_id`);

--
-- Ограничения внешнего ключа таблицы `positions`
--
ALTER TABLE `positions`
  ADD CONSTRAINT `positions_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`),
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `user_statuses` (`status_id`);

--
-- Ограничения внешнего ключа таблицы `user_tokens`
--
ALTER TABLE `user_tokens`
  ADD CONSTRAINT `user_tokens_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`),
  ADD CONSTRAINT `user_tokens_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
