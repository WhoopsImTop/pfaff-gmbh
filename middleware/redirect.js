// middleware/redirect.js

export default function ({ route, redirect }) {
    // Überprüfe, ob die angeforderte URL dem Muster entspricht
    if (route.path.match(/^\/news-medien-presse\/page\/\d+\/?$/)) {
      // Führe die Weiterleitung durch
      return redirect('/news-medien')
    }
  }
  