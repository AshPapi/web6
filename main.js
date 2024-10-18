document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM проверка");

    const quantityInput = document.getElementById('quantity');
    const productSelect = document.getElementById('product');
    const productLabel = document.getElementById('product-label');
    const contractCheckbox = document.getElementById('contract');
    const contractLabel = document.getElementById('label-contract');
    const totalElement = document.getElementById('total');
    const radiosContainer = document.getElementById('kurses');
    const radios = radiosContainer.querySelectorAll('input[name="prodOptions"]');
  
    // Скрыть все элементы при загрузке
    function hideAll() {
        productSelect.style.display = 'none';
        productLabel.style.display = 'none';
        contractCheckbox.style.display = 'none';
        contractLabel.style.display = 'none';
    }
        
    // Меняет форму в зависимости от выбранной опции
    function updateForm() {
        const selectedProduct = document.querySelector('input[name="prodOptions"]:checked');

        if (!selectedProduct) {
            console.log("Опция не выбрана");
            return;
        }

        console.log(`Выбрана опция: ${selectedProduct.value}`);
  
        // Скрываем все элементы перед показом нужных
        hideAll();
  
        switch (selectedProduct.value) {
            case 'option1': // Спорт.инвентарь
                // Ничего не нужно показывать
                break;
            case 'option2': // Форма
                productSelect.style.display = 'block';
                productLabel.style.display = 'block';
                break;
            case 'option3': // Организация выезда
                contractCheckbox.style.display = 'block';
                contractLabel.style.display = 'block';
                break;
        }
  
        calculateTotal();
    }
  
    // Функция для расчета общей стоимости
    function calculateTotal() {
        let totalPrice = 0;
        const quantity = document.getElementById('quantity');
            
        // Получаем цену в зависимости от типа продукта
        let price = 0;
        const selectedProduct = document.querySelector('input[name="prodOptions"]:checked');
        
        if (!selectedProduct) {
            console.log("Опция не выбрана для расчета");
            return;
        }

        console.log(`Расчет для опции: ${selectedProduct.value}`);
  
        switch (selectedProduct.value) {
            case 'option1':
                price = 1000; // Цена для спорт.инвентаря
                break;
            case 'option2':
                const selectedOption = productSelect.value;
                if (selectedOption === 'item1') {
                    price = 1500; // Цена для игровой формы
                } else if (selectedOption === 'item2') {
                    price = 2000; // Цена для тренировочной формы
                } else {
                    price = 2500; // Цена для спортивного костюма
                }
                break;
            case 'option3':
                price = 500; // Цена для организации выезда
                if (contractCheckbox.checked) {
                    price += 1000; // Доплата за доставку
                }
                break;
        }

        if (quantity < 0){
            totalElement.textContent = `Общая стоимость: 0 рублей (введите полож. число)`;
        }
        
        else{
            totalPrice = quantity * price;
            totalElement.textContent = `Общая стоимость: ${totalPrice} рублей`;
            console.log(`Общая стоимость: ${totalPrice}`);
        }
    }
  
    // Обработчики событий для изменений формы
    quantityInput.addEventListener('input', calculateTotal);
    radios.forEach(radio => radio.addEventListener('change', updateForm));
    productSelect.addEventListener('change', calculateTotal);
    contractCheckbox.addEventListener('change', calculateTotal);
  
    // Инициализация формы
    hideAll(); // Скрываем все элементы при загрузке страницы
    updateForm(); // Обновляем форму при первой загрузке
});
