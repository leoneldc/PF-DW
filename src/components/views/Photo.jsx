import { useState, useEffect } from "react";
import { useNavigate , useParams } from "react-router-dom";
import FilerobotImageEditor, {TABS,TOOLS,} from "react-filerobot-image-editor";
import { collection, getDocs, query, where, deleteDoc, doc  } from "firebase/firestore";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { db } from "../../config/firebase/connection";
import {HOME} from "../../config/routes/paths"
import "../styles/Photo.css";

const MySwal = withReactContent(Swal)

function Photo() {
  let navigate = useNavigate();
  const [isImgEditorShown, setIsImgEditorShown] = useState(false);
  const usersCollection = collection(db, "Galeria");
  const [datos, setDatos] = useState({});
  const { id } = useParams();

  const openImgEditor = () => {
    setIsImgEditorShown(true);
    const bnt_editar = document.getElementsByClassName("infoBlock");
    bnt_editar[0].classList.add("clickeado");
  };

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
    const bnt_editar = document.getElementsByClassName("infoBlock");
    bnt_editar[0].classList.remove("clickeado");
  };

  async function getGaleria() {
    const q = query(usersCollection, where("__name__", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setDatos(doc.data());
    });
  }

  async function deletePhoto() {
    await deleteDoc(doc(db,"Galeria", id ))
    return navigate(HOME);
  }

  useEffect(() => {
    getGaleria();
  }, []);

  return (
    <div className="urlFoto">
      <div className="espaciador"></div>
      <div className="edicion">
        <div className="infoBlock">
          <h1 className="photoTitle">{datos.title}</h1>
          <img className="photoImg" onClick={()=>{openImgEditor()}} src={datos.link} alt={datos.title} />

            <button onClick={()=>{
              MySwal.fire({
                title: '¿DESEA ELIMINAR ESTA IMAGEN?',
                text: "¡no podrá revertir esta acción!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si'
              }).then((result) => {
                if (result.isConfirmed) {
                  deletePhoto();
                  Swal.fire(
                    'ELIMINADO!',
                    'SE AH ELIMINADO EXITOSAMENTE TU IMAGEN.',
                    'success'
                  )
                }
              })
            }}>ELIMINAR</button>
        </div>
        {isImgEditorShown && (
          <FilerobotImageEditor
            source={datos.link}
            onSave={(editedImageObject, designState) => {
              let tmpLink = document.createElement("a");
              tmpLink.href = editedImageObject.imageBase64;
              tmpLink.download = editedImageObject.fullName;
              tmpLink.style =
                "position: absolute; z-index: -111; visibility: none;";
              document.body.appendChild(tmpLink);
              tmpLink.click();
              document.body.removeChild(tmpLink);
              tmpLink = null;
            }}
            onClose={closeImgEditor}
            annotationsCommon={{
              fill: "#ff0000",
            }}
            Text={{ text: "Filerobot..." }}
            tabsIds={[
              TABS.ADJUST,
              TABS.ANNOTATE,
              TABS.WATERMARK,
              TABS.FILTERS,
              TABS.FINETUNE,
            ]} // or {['Adjust', 'Annotate', 'Watermark']}
            defaultTabId={TABS.ANNOTATE} // or 'Annotate'
            defaultToolId={TOOLS.TEXT} // or 'Text'
          />
        )}
      </div>
    </div>
  );
}
export default Photo;
