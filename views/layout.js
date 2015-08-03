<!DOCTYPE html>
<html>
  <head>
    <title>Quiz</title>
    <meta charset="utf-8"/>
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <link rel='stylesheet' type="text/css" media="only screen and (min-width:530px) and (min-devide-width:481)" href='/stylesheets/wide.css' />
    <link rel='stylesheet' type="text/css" media="only screen and (max-width:480px)" href='/stylesheets/smartphone.css' />
    <link rel="icon" href="favicon.ico" type="image/x-icon"/>
  </head>
  <body>
  <div id="page-wrap">
    <header >
      <%if(!session.user){%>
        <span class="right"><a href="/login">Login</a></span>
      <% } else {%>
        <span class="right"><%= session.user.username %> <a href="/logout">Logout</a></span>
      <% } %>
      <h2>Quiz: El juego de las preguntas</h2>
    </header>
    <nav class="main" id="n1" role="navigation">
      <span><a href="/">Inicio</a></span>
      <span><a href="/quizzes">Preguntas</a></span>
      <span><a href="/autor">Creditos</a></span>
      <span><a href="/quizzes/statistics">Estadísticas</a></span>
    </nav>

    <section class="main" id="s1">
      <% if (errors.length){ %>
        <span id='ErrorMsgs'>
          Corregir errores:<br/>
          <% for (var i in errors){ %>
            <span> <%= errors[i].message %> </span><br/>
          <% } %>
        </span>
      <% } %>
      <%- body %>
    </section>

    <footer class="main" id="f1">
      <a href="http://es.wikipedia.org/wiki/Quiz">¿Qué es Quiz?</a>
      <a href="https://github.com/jcasablanca/Miriadax">GitHub</a>
    </footer>
  </div>
  </body>
</html>
