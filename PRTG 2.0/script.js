document.querySelectorAll('iframe').forEach(function(iframe) {
          //Verifica se o carregamento do iframe vai dar certinho
            iframe.addEventListener('load', function() {
            iframe.classList.remove('error-message');
          });
          //Função das mensagens de erro
          
          var timeoutId = setTimeout(function() {
            replaceIframe(iframe);
          }, 35000);
          //Tempo maximo de carregamento esperado antes de retornar mensagem de erro
      
          iframe.addEventListener('load', function() {
            clearTimeout(timeoutId);
             // Cancela o timeout se o iframe for carregado com sucesso antes do tempo limite
          });
      
          iframe.addEventListener('error', function() {
            replaceIframe(iframe);
            // Chama a função para substituir o iframe por uma mensagem de erro
          });
        });
      // Função para substituir o iframe por uma mensagem de erro
        function replaceIframe(iframe) {
            // Link padrão e mensagem de erro, porém deixei pelado aki
          var defaultLink = "";
          var iframeName = iframe.parentElement.querySelector('.iframe-name').textContent;
          var errorMessage = "A não, parece que o cliente " + iframeName + " está fora do ar. Precisamos verificar!";
                  
      
          // Adiciona a classe de mensagem de erro ao iframe
          iframe.classList.add('error-message');
          iframe.src = ''; // Pode ser útil limpar o src para evitar a exibição da mensagem de erro padrão do navegador
      
          var errorDiv = document.createElement('div');
          errorDiv.className = 'error-message';
          errorDiv.innerHTML = errorMessage + " <a href='" + defaultLink + "' target='_blank'>" + defaultLink + "</a>";
          
          // Remove o elemento <p class="iframe-name"> se a classe error-message estiver presente
            if (iframe.classList.contains('error-message')) {
                var iframeName = iframe.parentNode.querySelector('.iframe-name');
                if (iframeName) {
                    iframeName.remove();
                }
            }
    
          iframe.parentNode.replaceChild(errorDiv, iframe);
        }

        const iframes = document.querySelectorAll('.iframe-container iframe');
        let currentIndex = 0;

        function rotateHoverEffect() {
            iframes.forEach((iframe, i) => {
                iframe.style.transform = i === currentIndex ? 'scale(1.05)' : '';
            });
            currentIndex = (currentIndex + 1) % iframes.length;
        }

        setInterval(rotateHoverEffect, 2000000);//Efeito de passar o mouse a cada 2seg

        function reloadPage() {
            location.reload();
        }

        setInterval(reloadPage, 6000); // Recarrega a página a cada 60 segundos