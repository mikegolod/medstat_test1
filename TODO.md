На сервере лежит рабочий скрипт и текстовый файл, в нем - произвольное число.
Файл может быть изменен извне. Сервер предлагает ссылку на определенную
страницу вида "example.com/pagename", ее может открыть любое количество
пользователей с любых устройств (браузеры - современные и из числа наиболее
распространенных, задача поддержки совместимости не стоит). На странице - число
из файла на сервере, и кнопка. Число раз в минуту берется из файла на сервере и
обновляется для всех клиентов и скрипта на сервере. Кроме того, каждое нажатие
кнопки на странице увеличивает число на 1 для всех клиентов и скрипта на
сервере, но не влияет на содержимое файла. Измененное число обновляется для
всех пользователей на всех устройствах, у кого сейчас открыта страница,
актуальным значением считается последнее изменение. Нотификация об изменении -
по вебсокету. Для пользователя система должна оставаться насколько это возможно
работоспособной до тех пор, пока пользователь не закроет страницу. По закрытии
страницы пользователь считается ушедшим (он может когда-нибудь вернуться или
нет).
