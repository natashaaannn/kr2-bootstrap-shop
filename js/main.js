const orderForm = document.getElementById('orderForm');
if (orderForm) {
    const status = document.getElementById('orderStatus');
    const product = document.getElementById('order-product');
    const selected = new URLSearchParams(window.location.search).get('product');
    if (selected && Array.from(product.options).some(option => option.value === selected)) {
        product.value = selected;
    }
    orderForm.addEventListener('submit', event => {
        event.preventDefault();
        status.classList.remove('d-none');
    });
    orderForm.addEventListener('input', () => status.classList.add('d-none'));
    orderForm.addEventListener('reset', () => status.classList.add('d-none'));
}

for (const [formId, statusId] of [['feedback-form', 'feedback-success'], ['callback-form', 'callback-success']]) {
    const form = document.getElementById(formId);
    const status = document.getElementById(statusId);
    if (!form || !status) continue;
    form.addEventListener('submit', event => {
        event.preventDefault();
        status.hidden = false;
    });
    form.addEventListener('input', () => { status.hidden = true; });
    form.addEventListener('reset', () => { status.hidden = true; });
}
const callbackModal = document.getElementById('order-dialog');
if (callbackModal) {
    callbackModal.addEventListener('show.bs.modal', () => {
        document.getElementById('callback-form').reset();
    });
}

const catalogFilters = document.getElementById('catalogFilters');
if (catalogFilters) {
    const cards = Array.from(document.querySelectorAll('#catalog-products article'));
    catalogFilters.addEventListener('submit', event => {
        event.preventDefault();
        if (!catalogFilters.reportValidity()) return;
        const selectedTypes = Array.from(catalogFilters.querySelectorAll('[name="type"]:checked'), input => input.value);
        const selectedStatuses = Array.from(catalogFilters.querySelectorAll('[name="status"]:checked'), input => input.value);
        const from = document.getElementById('price-from').value;
        const to = document.getElementById('price-to').value;
        const min = from === '' ? 0 : Number(from);
        const max = to === '' ? Infinity : Number(to);
        let count = 0;
        for (const card of cards) {
            const matches = (!selectedTypes.length || selectedTypes.includes(card.dataset.type))
                && (!selectedStatuses.length || selectedStatuses.some(status => card.dataset.status.split(' ').includes(status)))
                && Number(card.dataset.price) >= min && Number(card.dataset.price) <= max;
            card.parentElement.classList.toggle('d-none', !matches);
            if (matches) count++;
        }
        document.getElementById('catalog-count').textContent = `Найдено товаров: ${count}`;
        document.getElementById('catalog-empty').classList.toggle('d-none', count !== 0);
    });
}
