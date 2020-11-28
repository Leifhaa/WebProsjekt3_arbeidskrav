##Using a proxy in order to define host only once

#Remember: 
Ha egen fil (ApiService.js med axios kall; brukes fra COntext-klassen).
Altså ha ajax kallene i en egen fil med funksjoner man exporter.
eks:
export getCharacters = () => {
    axois.get(url)
    return...
}

1 controller for admin, 1 for user. Det er viktig å skille mellom controllere som har med
admin og gjøre, og controllere som har med user å gjøre.

Lov å bruke styled components.

##Todo's:
make required and default props.