// import React, { ReactNode, useEffect, useState } from "react";
// import { IoIosClose } from "react-icons/io";

// interface ModalStructureProps {
//   children: ReactNode; // children puede ser cualquier contenido JSX
//   handleCloseModal: () => void; // handleCloseModal es una función que no retorna nada
//   customMaxW?: string; // customMaxW es un string
// }

// const ModalStructure: React.FC<ModalStructureProps> = ({
//   children,
//   handleCloseModal,
//   customMaxW,
// }) => {
//   const [isVisible, setIsVisible] = useState<boolean>(false);
//   const [isFullyVisible, setIsFullyVisible] = useState<boolean>(true);

//   useEffect(() => {
//     // Añadir clase para desactivar scroll global
//     document.body.classList.add("overflow-hidden");
//     setIsVisible(true);

//     return () => {
//       // Remover clase cuando el modal se cierra
//       document.body.classList.remove("overflow-hidden");
//       setIsVisible(false);
//     };
//   }, []);

//   const closeModal = () => {
//     setIsVisible(false); // Activa animación de salida
//     setTimeout(() => {
//       setIsFullyVisible(false); // Retrasa desmontaje hasta después de la animación
//       handleCloseModal(); // Notifica al padre una vez que la animación termina
//     }, 500); // Ajusta la duración del retraso según la duración de tu animación
//   };

//   if (!isFullyVisible) return null;

//   return (
//     <>
//       <div
//         className={` fade-box ${
//           isVisible ? "fade-in" : "fade-out"
//         } w-full fixed h-full flex items-center justify-center inset-0 left-0 top-0 z-50 bg-black bg-opacity-50 md:p-4 `}
//         onClick={closeModal}
//       >
//         <div
//           className={`flex flex-col max-h-full overflow-y-auto bg-white shadow-lg rounded-xl pt-4 md:pt-6 md:p-6 md:pb-4 pb-4 items-center justify-start relative ${
//             customMaxW ? customMaxW : "md:max-w-[600px]"
//           } w-full`}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="absolute md:right-[25px] md:top-[25px] top-[15px] right-[15px]">
//             <button
//               className="rounded-[50%] hover:bg-light-green-50 transition-all duration-100 p-1"
//               onClick={closeModal}
//             >
//               <IoIosClose className="w-[25px] h-[25px]" />
//             </button>
//           </div>
//           {children}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ModalStructure;

import React, { ReactNode, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";

interface ModalStructureProps {
  children: ReactNode; // children puede ser cualquier contenido JSX
  handleCloseModal: () => void; // handleCloseModal es una función que no retorna nada
  customMaxW?: string; // customMaxW es un string
}

const ModalStructure: React.FC<ModalStructureProps> = ({
  children,
  handleCloseModal,
  customMaxW,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFullyVisible, setIsFullyVisible] = useState(true);

  useEffect(() => {
    // Añadir clase para desactivar scroll global
    document.body.classList.add("overflow-hidden");
    setIsVisible(true);

    // Limpieza al desmontar el componente
    return () => {
      document.body.classList.remove("overflow-hidden");
      setIsVisible(false);
    };
  }, []);

  const closeModal = () => {
    setIsVisible(false); // Activa animación de salida
    setTimeout(() => {
      setIsFullyVisible(false); // Retrasa desmontaje hasta después de la animación
      handleCloseModal(); // Notifica al padre una vez que la animación termina
    }, 500); // Ajusta la duración del retraso según la duración de tu animación
  };

  if (!isFullyVisible) return null; // Si el modal no es completamente visible, no renderiza nada

  return (
    <>
      <div
        className={` fade-box ${
          isVisible ? "fade-in" : "fade-out"
        } w-full fixed h-full flex items-center justify-center inset-0 left-0 top-0 z-50 bg-black bg-opacity-50 md:p-4 `}
        onClick={closeModal}
      >
        <div
          className={`flex flex-col max-h-full overflow-y-auto bg-white shadow-lg rounded-xl pt-4 md:pt-6 md:p-6 md:pb-4 pb-4 items-center justify-start relative ${
            customMaxW ? customMaxW : "md:max-w-[600px]"
          } w-full`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute md:right-[25px] md:top-[25px] top-[15px] right-[15px]">
            <button
              className="rounded-[50%] hover:bg-light-green-50 transition-all duration-100 p-1"
              onClick={closeModal}
            >
              <IoIosClose className="w-[25px] h-[25px]" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalStructure;
