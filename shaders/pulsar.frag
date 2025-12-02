#version 120

uniform float uTime;      // Tempo (animação de pulso e scanline)
uniform float uDistancia; // Distância da câmera ao objeto (sensor)
uniform float uHeat;      // Variável não utilizada, mas comum em shaders

void main()
{
    
    float onda = (sin(uTime * 3.0) + 1.0) / 2.0;
    vec3 corVerde = mix(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0), onda);
    vec3 corAlerta = vec3(1.0, 0.0, 0.0); // Vermelho

    
    // FatorAlerta vai de 0.0 (longe) a 1.0 (perto/vermelho)
    float fatorAlerta = 1.0 - clamp((uDistancia - 3.0) / 7.0, 0.0, 1.0);
    vec3 corFinal = mix(corVerde, corAlerta, fatorAlerta);

    
    float scanline = sin(gl_FragCoord.y * 0.1 - uTime * 10.0);
    
    if (scanline < 0.0) 
    {
        corFinal = corFinal * 0.5; // Escurece nas faixas escuras
    }
    
    // Adiciona um brilho sutil nas faixas claras
    float brilho = max(0.0, scanline); 
    corFinal = corFinal + (vec3(0.2, 0.2, 0.2) * brilho);


    // Saída final
    gl_FragColor = vec4(corFinal, 1.0);
}