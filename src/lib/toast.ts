import Swal, { SweetAlertIcon } from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Ensure toast container stays fixed to viewport (bottom-end)
if (typeof window !== 'undefined' && !document.getElementById('swal-toast-fixed-style')) {
  const style = document.createElement('style');
  style.id = 'swal-toast-fixed-style';
  style.innerHTML = `
    .swal2-container.swal2-bottom-end.swal2-container--toast {
      position: fixed !important;
      inset: auto 12px 12px auto !important;
      pointer-events: none;
    }
    .swal2-container.swal2-bottom-end.swal2-container--toast .swal2-popup {
      pointer-events: auto;
    }
  `;
  document.head.appendChild(style);
}

const toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  background: '#000',
  color: '#fff',
  target: 'body',
  customClass: {
    container: 'swal2-bottom-end',
    popup: 'shadow-2xl rounded-2xl',
    title: 'text-sm font-medium',
  },
  didOpen: (el) => {
    el.style.zIndex = '9999';
  },
});

export function showToast(type: SweetAlertIcon, title: string) {
  toast.fire({ icon: type, title });
}

export default showToast;
