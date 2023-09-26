import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Usuario } from "src/app/account/auth/models/usuario.models";
import { UsuarioService } from "src/app/account/auth/services/usuario.service";
import { NAME_VALIDATE } from "src/app/constants/constants";
import { EmpleadoService } from "src/app/modules/empleado/service/empleado.service";
import { MensajesService } from "src/app/shared/global/mensajes.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  formEmpleado!: FormGroup;
  formUsuario!: FormGroup;
  @Input() usuario!: Usuario;
  @Input() leyenda!: string;
  public imgTemp: string | ArrayBuffer = null;
  private file!: File;
  imagen: string = "no hay";
  fotoEmpleado!: string;
  private isText: string = NAME_VALIDATE;
  msjclave!: string;
  seguridad!: string;
  msjclaveconfir!: string;
  confirma!: string;
  media!: boolean;
  public showPassword: boolean = false;
  public password: string = "";
  public showPassword2: boolean = false;

  alerts = [
    {
      id: 1,
      type: "info",
      message:
        "Complete los campos obligatorios (*); la imagen no es obligatoria",
      show: false,
    },
  ];

  alerts2 = [
    {
      id: 1,
      type: "info",
      message:
        "Por favor, complete todos los campos obligatorios (*). Asegúrese de que las claves coincidan y tengan un nivel de seguridad medio. La clave debe incluir letras mayúsculas y minúsculas, tener más de 5 caracteres y contener caracteres especiales como '!@#$%^&'",
      show: false,
    },
  ];

  constructor(
    private usuarioService: UsuarioService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private empleadoService: EmpleadoService,
    private mensajesService: MensajesService
  ) {
    this.formEmpleado = this.iniciarFormularioE();
    this.formUsuario = this.iniciarFormularioU();
  }

  ngOnInit() {
    this.fotoEmpleado = this.usuarioService.empleadofoto;
    this.usuarioService.getEmpleado();
    this.usuarioService.getUsuario();
    
    if (this.leyenda == "Credenciales") {
      this.restaurarAlerts2();
    }
  }

  private iniciarFormularioE() {
    return this.fb.group({
      codigoEmpleado: [""],
      dui: [""],
      nombre: ["", [Validators.required, Validators.pattern(this.isText)]],
      apellido: ["", [Validators.required, Validators.pattern(this.isText)]],
      telefono: ["", [Validators.required, Validators.pattern(/^[267]\d{7}$/)]],
      licencia: [""],
      tipolicencia: [""],
      fechalicencia: [""],
      jefe: [""],
      estado: [""],
      nombrefoto: [""],
      urlfoto: [""],
      correo: [""],
      cargo: [""],
      departamento: [""],
    });
  }

  private iniciarFormularioU() {
    return this.fb.group({
      codigoUsuario: [""],
      empleado: [""],
      nombre: [""],
      nuevo: [""],
      token: [""],
      clave: ["", [Validators.required]],
    });
  }

  ///// metodo que extrae la informacion de la imagen /////
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.file = (target.files as FileList)[0];
    this.imagen = "seleccioanda";
    this.preVisualizarImagen(event);
  }

  ///// metodo para previsualizar la imagen /////
  preVisualizarImagen(event: any) {
    this.file = event.target.files[0];
    //cambia a imagen previa
    if (!this.file) {
      this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  get empleado() {
    return this.usuarioService.empleado;
  }

  guardar() {
    if (this.formEmpleado.valid || this.formUsuario.valid) {
      if (this.leyenda == "Datos") {
        this.registrandoE();
      } else {
        if (this.confirma == "confirmada" && this.media) {
          this.registrandoU();
        } else {
          Swal.fire({
            position: "center",
            title: "Faltan parametros de seguridad",
            html: "Las claves deben coincidir y tener seguridad media como minimo",
            icon: "warning",
          });
        }
      }
    } else {
      Swal.fire({
        position: "center",
        title: "Faltan datos en el formuario",
        html: 'Complete todos los campos requeridos (<span style="color: red;">*</span>)',
        icon: "warning",
      });
    }
  }

  registrandoE() {
    this.EstructurandoFormE();
    const empleado = this.formEmpleado.value;

    console.log(empleado);

    if (this.imagen === "no hay") {
      this.empleadoService.putEmpleado(empleado).subscribe(
        (resp: any) => {
          if (resp) {
            if (this.usuarioService.validarToken()) {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                //timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener("mouseenter", Swal.stopTimer);
                  toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: "success",
                text: "Modificacion exitosa",
              }).then(() => {
                // Aquí se realiza la redirección
                this.formEmpleado.reset();
                this.recargar();
                this.modalService.dismissAll();
                window.location.reload();
              });
            }
          }
        },
        (err: any) => {
          this.mensajesService.mensajesSweet(
            "error",
            "Ups... Algo salió mal",
            err.error.message
          );
        }
      );
    } else {
      this.empleadoService.putEmpleadoImagen(empleado, this.file).subscribe(
        (resp: any) => {
          if (resp) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              //timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "success",
              text: "Modificacion exitosa",
            }).then(() => {
              // Aquí se realiza la redirección
              this.formEmpleado.reset();
              this.recargar();
              this.modalService.dismissAll();
              window.location.reload();
            });
          }
        },
        (err: string) => {
          this.mensajesService.mensajesSweet(
            "error",
            "Ups... Algo salió mal",
            err
          );
        }
      );
    }
  }

  EstructurandoFormE() {
    const nombre = this.formEmpleado.get("nombre").value;
    const apellido = this.formEmpleado.get("apellido").value;
    const telefono = this.formEmpleado.get("telefono").value;

    const objeto = this.usuarioService.empleado;
    objeto.nombre = nombre;
    objeto.telefono = telefono;
    objeto.apellido = apellido;

    this.formEmpleado.patchValue(objeto);
    this.formEmpleado.patchValue({
      cargo: objeto.cargo.id,
    });
    this.formEmpleado.patchValue({
      departamento: objeto.departamento.codigoDepto,
    });
  }

  registrandoU() {
    this.EstructurandoFormU();
    const usuario = this.formUsuario.value;

    console.log(usuario);
    this.usuarioService.Credenciales(usuario).subscribe(
      (resp: any) => {
        if (resp) {
          if (this.usuarioService.validarToken()) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              //timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "success",
              text: "Modificacion exitosa",
            }).then(() => {
              this.formEmpleado.reset();
              this.recargar();
              this.modalService.dismissAll();
            });
          }
        }
      },
      (err: any) => {
        this.mensajesService.mensajesSweet(
          "error",
          "Ups... Algo salió mal",
          err.error.message
        );
      }
    );
  }

  EstructurandoFormU() {
    const clave = this.formUsuario.get("clave").value;

    const objeto = this.usuarioService.usuario;
    objeto.clave = clave;
    this.formUsuario.patchValue(objeto);
  }

  esCampoValido(campo: string) {
    const validarCampo = this.formEmpleado.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? "is-invalid"
      : validarCampo?.touched
      ? "is-valid"
      : "";
  }

  esCampoValidoU(campo: string) {
    const validarCampo = this.formUsuario.get(campo);
    return !validarCampo?.valid && validarCampo?.touched
      ? "is-invalid"
      : validarCampo?.touched
      ? "is-valid"
      : "";
  }

  ///// Metodo para recargar la pagina /////
  recargar() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }

  openModal(content: any) {
    this.modalService.open(content, { size: "", backdrop: "static" });
  }

  CambiarAlert(alert) {
    alert.show = !alert.show;
  }

  restaurarAlerts() {
    this.alerts.forEach((alert) => {
      alert.show = true;
    });
  }

  siMuestraAlertas() {
    return this.alerts.every((alert) => alert.show);
  }

  CambiarAlert2(alert2) {
    alert2.show = !alert2.show;
  }

  restaurarAlerts2() {
    this.alerts2.forEach((alert2) => {
      alert2.show = true;
    });
  }

  siMuestraAlertas2() {
    return this.alerts2.every((alert2) => alert2.show);
  }

  SeguridadClave(event: any) {
    const clave = event.target.value;

    this.seguridad = this.evaluarSeguridadClave(clave);
    if (this.seguridad === "alta") {
      this.msjclave = "Seguridad alta";
    } else if (this.seguridad === "media") {
      this.msjclave = "Seguridad media";
    } else {
      this.msjclave = "La clave es poco segura";
    }
  }

  VerificarClaves(event: any) {
    const clave = this.formUsuario.get("clave").value;

    const valorConfirClave = event.target.value;

    if (clave === valorConfirClave) {
      this.msjclaveconfir = "Clave confirmada";
      this.confirma = "confirmada";
    } else {
      this.msjclaveconfir = "Las claves no coinciden";
      this.confirma = "errorclave";
    }
  }

  evaluarSeguridadClave(clave: string): "baja" | "media" | "alta" {
    if (clave.length < 5) {
      this.media = false;
      return "baja";
    }
    if (/^[a-zA-Z]+$/.test(clave)) {
      this.media = true;
      return "media";
    }
    if (
      /[0-9]/.test(clave) &&
      /[A-Z]/.test(clave) &&
      /[!@#$%^&*]/.test(clave)
    ) {
      this.media = true;
      return "alta";
    }
    this.media = true;
    return "media";
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public togglePasswordVisibility2(): void {
    this.showPassword2 = !this.showPassword2;
  }
}
