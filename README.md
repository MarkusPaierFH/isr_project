# Information Security and Riskmanagement
Dieses Repository beinhaltet das im Rahmen der Lehrveranstaltung "Information Security and Riskmanagement" der FH Joanneum Graz implementiertes WebApp-Projekt, um unsichere Implementierungen von Web-Applikationen zu demonstrieren.

## Auflösung/Schritte um Passwörter auszulesen
### 1. Gespeicherte Credentials

![img.png](assets/01_credentials.png)

### 2. Login
Analyse der Webseite, insbesondere dem JS

![img.png](assets/02_login.png)

JS ist zwar minified und obfuscated, ich sehe aber die Ordnerstruktur am Server. Unter [/js/main.js](http://localhost:8081/js/main.js) findet man das originale JS (optional), falls man sich das näher noch ansehen will. Man sieht aber auch alles direkt in den Browser-Entwicklertools.

![img.png](assets/03_js.png)

### 3. SQL-Injection

Request:
> POST http://localhost:8081/login
>
> user=mustermann@mail.com' OR '1'='1&pwd=asdf


Da sieht man dann im Network-Tab folgendes:

![img.png](assets/04_sqlinjection.png)

