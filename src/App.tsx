import * as React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Input, Button, Typography, FormGroup } from "@mui/material";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const validateForm: any = yup.object().shape({
  name: yup.string().required("nome obrigatorio"),
  tel: yup
    .number()
    .nullable()
    .required("telefone obrigatorio")
    .max(11, "digite um numero valido"),
  date: yup.string().required("data obrigatoria"),
  email: yup.string().email().required("e-mail obrigatorio"),
});

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(#0) 00000-0000"
        definitions={{
          "#": /[1-9]/,
        }}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

function App() {
  const [values, setValues] = React.useState({
    textmask: "(00) 00000-0000",
    numberformat: "1320",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const addPost = () => {
    try {
      console.log("deu certo");
    } catch {
      console.log("deu ruim");
    }
  };

  const { register, handleSubmit } = useForm<any>({
    resolver: yupResolver(validateForm),
  });
  return (
    <FormGroup
      onSubmit={handleSubmit(addPost)}
      style={{ width: "25%", marginTop: "5%", marginLeft: "10%" }}
    >
      <Box display="flex" flexDirection="column" gap="20px">
        <Box>
          <Typography>Nome</Typography>
          <Input
            type={"text"}
            placeholder="Digite seu nome"
            {...register("name")}
          />
        </Box>
        <Box>
          <Typography>Telefone</Typography>
          <Input
            placeholder="Digite seu telefone"
            value={values.textmask}
            {...register("tel")}
            onChange={handleChange}
            name="textmask"
            id="formatted-text-mask-input"
            inputComponent={TextMaskCustom as any}
          />
        </Box>
        <Box>
          <Typography>E-mail</Typography>
          <Input
            type={"email"}
            placeholder="Digite seu e-mail"
            {...register("email")}
          />
        </Box>
        <Box>
          <Typography>Data</Typography>
          <Input type="date" {...register("date")} />
        </Box>
        <Button variant="contained" type="submit">
          Enviar
        </Button>
      </Box>
    </FormGroup>
  );
}

export default App;
