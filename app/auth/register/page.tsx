'use client';

import { useState } from 'react';
import { Rubik } from 'next/font/google';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldTitle,
} from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

import { BsCheckCircleFill } from 'react-icons/bs';
import { CiAt } from 'react-icons/ci';
import { FaRegCircle, FaRulerHorizontal } from 'react-icons/fa';
import { FaDumbbell } from 'react-icons/fa6';
import {
  IoMdEye,
  IoMdEyeOff,
  IoMdMale,
  IoMdFemale,
  IoMdInformationCircleOutline,
} from 'react-icons/io';
import { PiSpeedometerFill } from 'react-icons/pi';
import { MdBolt } from 'react-icons/md';
import { GiMeditation } from 'react-icons/gi';
import { TiUserAdd } from 'react-icons/ti';
import { LuChevronRight, LuChevronLeft } from 'react-icons/lu';
import { GoCircle } from 'react-icons/go';

import { signUp } from '../actions';
import { signUpSchema } from '@/lib/validation/auth';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
});

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    age: '' as number | string,
    gender: '',
    goal: '',
    experience: '',
    height: '' as number | string,
    weight: '' as number | string,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [api, setApi] = useState<CarouselApi>();

  const stepFields = {
    1: ['email', 'password'],
    2: ['name', 'age', 'gender'],
    3: ['height', 'weight'],
    4: ['goal'],
    5: ['experience'],
  } as const;

  const validateStep = async () => {
    const fields = stepFields[currPage as keyof typeof stepFields];

    const stepSchema = signUpSchema.pick(
      Object.fromEntries(fields.map((field) => [field, true])) as any,
    );

    const dataToValidate = Object.fromEntries(
      fields.map((field) => [field, data[field as keyof typeof data]]),
    );

    const result = await stepSchema.safeParseAsync(dataToValidate);

    if (!result.success) {
      const newErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        if (!newErrors[fieldName]) {
          newErrors[fieldName] = issue.message;
        }
      });

      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleUserData = (property: string, val: string | number) => {
    setData((prev) => ({
      ...prev,
      [property]: val,
    }));
  };

  const handlePagination = async (btnDir: string) => {
    if (btnDir === 'next' && currPage < 5) {
      if (await validateStep()) {
        setCurrPage((prev) => prev + 1);
        api?.scrollNext();
      }
    } else if (btnDir === 'prev' && currPage > 1) {
      setErrors({});
      setCurrPage((prev) => prev - 1);
      api?.scrollPrev();
    }
  };

  const handleSubmit = async () => {
    setSubmitError('');

    if (!(await validateStep())) return;

    const formattedData = {
      ...data,
      age: Number(data.age) || 0,
      height: Number(data.height) || 0,
      weight: Number(data.weight) || 0,
    };

    const result = await signUp(formattedData);

    if (result?.success === false) {
      if (result.errors) {
        setErrors(result.errors);
      } else if (result.message) {
        setSubmitError(result.message);
      }
    }
  };

  return (
    <>
      <main className="bg-custom-page flex flex-1 flex-col items-center">

        <div className="flex w-full max-w-lg gap-1.5 px-4 pt-4 sm:px-6 sm:pt-5">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${
                step <= currPage ? 'bg-custom-primary' : 'bg-custom-border'
              }`}
            />
          ))}
        </div>

        <Carousel
          opts={{ watchDrag: false, watchFocus: false }}
          className="flex w-full max-w-lg flex-1 flex-col justify-between p-4 text-custom-text-main sm:p-6"
          setApi={setApi}
        >
          <CarouselContent className="flex gap-10 p-4">
            <CarouselItem>
              <section className="mb-12 flex flex-col items-center">
                <h1 className="text-center text-[2.5rem] font-extralight">
                  Create Account
                </h1>
                <h2 className="text-custom-text-muted max-w-60 text-center text-sm">
                  Begin your performance tracking journey.
                </h2>
              </section>
              <form>
                <Field>
                  <FieldLabel className="text-custom-text-muted/80 font-normal">
                    EMAIL ADDRESS
                  </FieldLabel>
                  <InputGroup className="border-custom-text-muted/40 rounded-none border-b">
                    <InputGroupInput
                      type="email"
                      value={data.email}
                      onChange={(e) =>
                        handleUserData('email', e.currentTarget.value)
                      }
                      placeholder="example@email.com"
                      className="placeholder:text-custom-text-muted/20 autofill:shadow-[inset_0_0_0_1000px_transparent] autofill:transition-colors autofill:duration-[5000000s]"
                    />
                    <InputGroupAddon align="inline-end">
                      <CiAt className="text-custom-secondary" />
                    </InputGroupAddon>
                  </InputGroup>
                  {errors.email && (
                    <p className="text-sm text-orange-600">{errors.email}</p>
                  )}
                  <FieldLabel className="text-custom-text-muted/60 mt-4 font-normal">
                    PASSWORD
                  </FieldLabel>
                  <InputGroup className="border-custom-text-muted/40 rounded-none border-b">
                    <InputGroupInput
                      type={showPassword ? 'text' : 'password'}
                      placeholder="•••••••"
                      value={data.password}
                      onChange={(e) =>
                        handleUserData('password', e.currentTarget.value)
                      }
                      className="placeholder:text-custom-text-muted/20"
                    />
                    <InputGroupAddon align="inline-end">
                      {showPassword ? (
                        <IoMdEyeOff
                          className="text-custom-secondary"
                          onClick={() => setShowPassword((prev) => !prev)}
                        />
                      ) : (
                        <IoMdEye
                          className="text-custom-secondary"
                          onClick={() => setShowPassword((prev) => !prev)}
                        />
                      )}
                    </InputGroupAddon>
                  </InputGroup>
                  {errors.password && (
                    <p className="text-sm text-orange-600">{errors.password}</p>
                  )}
                </Field>
              </form>
              <section className="text-custom-text-muted my-10 flex items-center justify-center gap-6 text-xs">
                <span className="flex items-center gap-2">
                  {data.password.length >= 8 ? (
                    <BsCheckCircleFill
                      size={15}
                      className="text-custom-secondary"
                    />
                  ) : (
                    <FaRegCircle
                      size={15}
                      className="text-custom-text-muted/30"
                    />
                  )}
                  8+ CHARACTERS
                </span>
                <span className="flex items-center gap-2">
                  {/[^A-Za-z0-9]/.test(data.password) ? (
                    <BsCheckCircleFill
                      size={15}
                      className="text-custom-secondary"
                    />
                  ) : (
                    <FaRegCircle
                      size={15}
                      className="text-custom-text-muted/30"
                    />
                  )}
                  SPECIAL SYMBOL
                </span>
              </section>
            </CarouselItem>
            <CarouselItem>
              <section className="flex flex-col gap-6">
                <section className="flex flex-col gap-2">
                  <h2 className="text-custom-secondary font-bold">
                    PERSONAL DATA
                  </h2>
                  <h1 className="text-custom-text-main text-4xl font-medium">
                    About You
                  </h1>
                  <h3 className="text-custom-text-muted font-light">
                    We use this to calibrate your metabolic baseline and
                    performance curves.
                  </h3>
                </section>
                <form>
                  <Field>
                    <FieldLabel className="text-custom-text-muted/80 font-normal">
                      FULL NAME
                    </FieldLabel>
                    <InputGroup className="border-custom-text-muted/40 rounded-none border-b">
                      <InputGroupInput
                        type="text"
                        placeholder="e.g. Alex Rivera"
                        className="placeholder:text-custom-text-muted/20"
                        value={data.name}
                        onChange={(e) =>
                          handleUserData('name', e.currentTarget.value)
                        }
                      />
                    </InputGroup>
                    {errors.name && (
                      <p className="text-sm text-orange-600">{errors.name}</p>
                    )}
                    <FieldLabel className="text-custom-text-muted/60 mt-4 font-normal">
                      AGE
                    </FieldLabel>
                    <InputGroup className="border-custom-text-muted/40 rounded-none border-b">
                      <InputGroupInput
                        type="number"
                        placeholder="24"
                        value={data.age}
                        onChange={(e) =>
                          handleUserData('age', e.currentTarget.value)
                        }
                        className="placeholder:text-custom-text-muted/20 [appearance:textfield] duration-250 ease-in [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <InputGroupAddon
                        align="inline-end"
                        className="text-custom-text-muted/40"
                      >
                        YEARS
                      </InputGroupAddon>
                    </InputGroup>
                    {errors.age && (
                      <p className="text-sm text-orange-600">{errors.age}</p>
                    )}
                    <RadioGroup
                      className="flex flex-row flex-wrap"
                      value={data.gender}
                      onValueChange={(val) => handleUserData('gender', val)}
                    >
                      <FieldLegend className="text-custom-text-muted/80 mt-4 w-full font-normal">
                        BIOLOGICAL GENDER
                      </FieldLegend>
                      <FieldLabel className="bg-custom-text-muted/5 has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:outline-custom-secondary group/radio flex-1 p-2 duration-250 ease-in has-data-[state=checked]:outline has-data-[state=unchecked]:outline-transparent">
                        <Field>
                          <FieldContent className="grid place-items-center gap-2">
                            <FieldTitle>
                              <IoMdMale className="text-custom-text-muted group-has-data-[state=checked]/radio:text-custom-secondary text-xl" />
                            </FieldTitle>
                            <FieldDescription className="font-medium">
                              MALE
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem value="male" className="hidden" />
                        </Field>
                      </FieldLabel>
                      <FieldLabel className="bg-custom-text-muted/5 has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:outline-custom-secondary group/radio flex-1 p-2 duration-250 ease-in has-data-[state=checked]:outline has-data-[state=unchecked]:outline-transparent">
                        <Field>
                          <FieldContent className="grid place-items-center gap-2">
                            <FieldTitle>
                              <IoMdFemale className="text-custom-text-muted group-has-data-[state=checked]/radio:text-custom-secondary text-xl" />
                            </FieldTitle>
                            <FieldDescription className="font-medium">
                              FEMALE
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem value="female" className="hidden" />
                        </Field>
                      </FieldLabel>
                      <FieldLabel className="bg-custom-text-muted/5 group/radio has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:outline-custom-secondary flex-1 p-2 duration-250 ease-in has-data-[state=checked]:outline has-data-[state=unchecked]:outline-transparent">
                        <Field>
                          <FieldContent className="grid place-items-center gap-2">
                            <FieldTitle>
                              <FaRegCircle className="text-custom-text-muted group-has-data-[state=checked]/radio:text-custom-secondary text-xl" />
                            </FieldTitle>
                            <FieldDescription className="font-medium">
                              OTHER
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem value="other" className="hidden" />
                        </Field>
                      </FieldLabel>
                    </RadioGroup>
                    {errors.gender && (
                      <p className="text-sm text-orange-600">{errors.gender}</p>
                    )}
                  </Field>
                </form>
              </section>
            </CarouselItem>
            <CarouselItem inert={currPage !== 3}>
              <section className="flex flex-col gap-6">
                <section className="flex flex-col gap-2">
                  <h2 className="text-custom-secondary font-bold">
                    BIOMETRICS
                  </h2>
                  <h1 className="text-custom-text-main text-4xl font-medium">
                    Physical Profile
                  </h1>
                  <h3 className="text-custom-text-muted font-light">
                    Precision is the foundation of progress. Provide your
                    current measurements for accurate metabolic tracking.
                  </h3>
                </section>
                <form className="">
                  <Field>
                    <FieldLabel className="text-custom-text-muted/60">
                      STATURE
                    </FieldLabel>
                    <InputGroup className="border-custom-text-muted/40 rounded-none border-b">
                      <InputGroupInput
                        type="number"
                        placeholder="000"
                        value={data.height}
                        onChange={(e) =>
                          handleUserData('height', e.currentTarget.value)
                        }
                        className="placeholder:text-custom-text-muted/20 [appearance:textfield] duration-250 ease-in [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <InputGroupAddon align="inline-end">CM</InputGroupAddon>
                    </InputGroup>
                    {errors.height && (
                      <p className="text-sm text-orange-600">{errors.height}</p>
                    )}
                    <FieldLabel className="text-custom-text-muted/60">
                      BODY MASS
                    </FieldLabel>
                    <InputGroup className="border-custom-text-muted/40 rounded-none border-b">
                      <InputGroupInput
                        type="number"
                        placeholder="00.0"
                        className="placeholder:text-custom-text-muted/20 [appearance:textfield] duration-250 ease-in [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        value={data.weight}
                        onChange={(e) =>
                          handleUserData('weight', e.currentTarget.value)
                        }
                      />
                      <InputGroupAddon align="inline-end">KG</InputGroupAddon>
                    </InputGroup>
                    {errors.weight && (
                      <p className="text-sm text-orange-600">{errors.weight}</p>
                    )}
                  </Field>
                </form>
                <Badge className="glass border border-custom-border bg-custom-card-bg flex items-start gap-3 rounded-xl p-4 whitespace-normal">
                  <IoMdInformationCircleOutline
                    size={20}
                    className="mt-0.5 shrink-0 text-custom-secondary"
                  />
                  <p className="text-left text-sm text-custom-text-muted">
                    <span className="block text-base font-medium text-custom-text-main">
                      Calibration Note
                    </span>
                    These values will calibrate your initial calorie expenditure
                    algorithms. You can update these anytime in your dashboard
                    as your body composition evolves.
                  </p>
                </Badge>
              </section>
            </CarouselItem>
            <CarouselItem inert={currPage !== 4}>
              <section className="flex flex-col gap-6">
                <section className="flex flex-col gap-2">
                  <h2 className="text-custom-secondary font-bold">STRATEGY</h2>
                  <h1 className="text-custom-text-main text-4xl font-medium">
                    Define Your Goal
                  </h1>
                  <h3 className="text-custom-text-muted font-light">
                    Knowing where you’re going is half the battle. Start with a
                    clear destination to keep your momentum high.
                  </h3>
                </section>
                <form>
                  <RadioGroup
                    className="grid grid-cols-2"
                    value={data.goal}
                    onValueChange={(val) => handleUserData('goal', val)}
                  >
                    <FieldLabel className="bg-custom-text-muted/5 group/radio has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:outline-custom-secondary flex-1 p-2 duration-250 ease-in has-data-[state=checked]:outline has-data-[state=unchecked]:outline-transparent">
                      <Field>
                        <FieldContent className="grid place-items-center gap-3">
                          <FieldTitle className="bg-custom-text-muted/20 group-has-data-[state=checked]/radio:bg-custom-secondary group-has-data-[state=checked]/radio:text-custom-text-main text-custom-text-muted mr-auto rounded-sm p-2 duration-250 ease-in">
                            <FaDumbbell className="text-2xl" />
                          </FieldTitle>
                          <FieldDescription className="mr-auto font-medium">
                            <span className="text-custom-text-muted text-lg">
                              Muscle Gain
                            </span>
                            <br />
                            <span className="text-xs">HYPERTROPHY FOCUS</span>
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem
                          value="muscle_gain"
                          className="hidden"
                        />
                      </Field>
                    </FieldLabel>
                    <FieldLabel className="bg-custom-text-muted/5 group/radio has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:outline-custom-secondary flex-1 p-2 duration-250 ease-in has-data-[state=checked]:outline has-data-[state=unchecked]:outline-transparent">
                      <Field>
                        <FieldContent className="grid place-items-center gap-3">
                          <FieldTitle className="bg-custom-text-muted/20 group-has-data-[state=checked]/radio:bg-custom-secondary group-has-data-[state=checked]/radio:text-custom-text-main text-custom-text-muted mr-auto rounded-sm p-2 duration-250 ease-in">
                            <PiSpeedometerFill className="text-2xl" />
                          </FieldTitle>
                          <FieldDescription className="mr-auto font-medium">
                            <span className="text-custom-text-muted text-lg">
                              Weight Loss
                            </span>
                            <br />
                            <span className="text-xs">METABOLIC FOCUS</span>
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem
                          value="weight_loss"
                          className="hidden"
                        />
                      </Field>
                    </FieldLabel>
                    <FieldLabel className="bg-custom-text-muted/5 group/radio has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:outline-custom-secondary flex-1 p-2 has-data-[state=checked]:outline has-data-[state=unchecked]:outline-transparent">
                      <Field>
                        <FieldContent className="grid place-items-center gap-3">
                          <FieldTitle className="bg-custom-text-muted/20 group-has-data-[state=checked]/radio:bg-custom-secondary group-has-data-[state=checked]/radio:text-custom-text-main text-custom-text-muted mr-auto rounded-sm p-2 duration-250 ease-in">
                            <MdBolt className="text-2xl" />
                          </FieldTitle>
                          <FieldDescription className="mr-auto font-medium">
                            <span className="text-custom-text-muted text-lg">
                              Athleticsm
                            </span>
                            <br />
                            <span className="text-xs">POWER & AGILITY</span>
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value="athleticsm" className="hidden" />
                      </Field>
                    </FieldLabel>
                    <FieldLabel className="bg-custom-text-muted/5 group/radio has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:outline-custom-secondary flex-1 p-2 has-data-[state=checked]:outline has-data-[state=unchecked]:outline-transparent">
                      <Field>
                        <FieldContent className="grid place-items-center gap-3">
                          <FieldTitle className="bg-custom-text-muted/20 group-has-data-[state=checked]/radio:bg-custom-secondary group-has-data-[state=checked]/radio:text-custom-text-main text-custom-text-muted mr-auto rounded-sm p-2 duration-250 ease-in">
                            <GiMeditation className="text-2xl" />
                          </FieldTitle>
                          <FieldDescription className="mr-auto font-medium">
                            <span className="text-custom-text-muted text-lg">
                              Longevity
                            </span>
                            <br />
                            <span className="text-xs">MOBILITY FOCUS</span>
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value="longevity" className="hidden" />
                      </Field>
                    </FieldLabel>
                  </RadioGroup>
                  {errors.goal && (
                    <p className="text-sm text-orange-600">{errors.goal}</p>
                  )}
                </form>
              </section>
            </CarouselItem>
            <CarouselItem className="pr-4 pl-0">
              <section className="flex flex-col items-center gap-6">
                <section className="flex flex-col gap-2">
                  <h2 className="text-custom-secondary font-bold">
                    DATA CALIBRATION
                  </h2>
                  <h1 className="text-custom-text-main text-4xl font-medium">
                    Training Experience
                  </h1>
                  <h3 className="text-custom-text-muted font-light">
                    Select how long you have been training consistently to
                    receive the most accurate performance data.
                  </h3>
                </section>
                <form>
                  <RadioGroup
                    value={data.experience}
                    onValueChange={(val) => handleUserData('experience', val)}
                  >
                    <FieldLabel className="bg-custom-text-muted/5 has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:outline-custom-secondary duration-250 ease-in has-data-[state=checked]:outline has-data-[state=unchecked]:outline-transparent">
                      <Field>
                        <FieldContent className="flex flex-row items-center">
                          <FieldTitle className="p- flex flex-col gap-0 p-3">
                            <span
                              className={`text-custom-secondary text-2xl font-medium ${rubik.className}`}
                            >
                              0-1
                            </span>
                            <span className="text-custom-text-muted/75 text-xs">
                              YEARS
                            </span>
                          </FieldTitle>
                          <FieldDescription className="flex flex-col">
                            <span className="text-custom-text-muted text-xl">
                              Beginner
                            </span>
                            <span className="text-custom-text-muted/80">
                              Focusing on form and habit building.
                            </span>
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value="beginner" className="hidden" />
                      </Field>
                    </FieldLabel>
                    <FieldLabel className="bg-custom-text-muted/5 has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:outline-custom-secondary duration-250 ease-in has-data-[state=checked]:outline has-data-[state=unchecked]:outline-transparent">
                      <Field>
                        <FieldContent className="flex flex-row items-center">
                          <FieldTitle className="p- flex flex-col gap-0 p-3">
                            <span
                              className={`text-custom-secondary text-2xl font-medium ${rubik.className}`}
                            >
                              1-3
                            </span>
                            <span className="text-custom-text-muted/75 text-xs">
                              YEARS
                            </span>
                          </FieldTitle>
                          <FieldDescription className="flex flex-col">
                            <span className="text-custom-text-muted text-xl">
                              Intermediate
                            </span>
                            <span className="text-custom-text-muted/80">
                              Familiar with major compound movements.
                            </span>
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem
                          value="intermediate"
                          className="hidden"
                        />
                      </Field>
                    </FieldLabel>
                    <FieldLabel className="bg-custom-text-muted/5 has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:outline-custom-secondary duration-250 ease-in has-data-[state=checked]:outline has-data-[state=unchecked]:outline-transparent">
                      <Field>
                        <FieldContent className="flex flex-row items-center">
                          <FieldTitle className="p- flex flex-col gap-0 p-3">
                            <span
                              className={`text-custom-secondary text-2xl font-medium ${rubik.className}`}
                            >
                              3+
                            </span>
                            <span className="text-custom-text-muted/75 text-xs">
                              YEARS
                            </span>
                          </FieldTitle>
                          <FieldDescription className="flex flex-col">
                            <span className="text-custom-text-muted text-xl">
                              Advanced
                            </span>
                            <span className="text-custom-text-muted/80">
                              Consistently training with specific.
                            </span>
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value="advanced" className="hidden" />
                      </Field>
                    </FieldLabel>
                  </RadioGroup>
                  {errors.experience && (
                    <p className="text-sm text-orange-600">
                      {errors.experience}
                    </p>
                  )}
                </form>
              </section>
            </CarouselItem>
          </CarouselContent>
          {submitError && (
            <p className="mt-4 text-center text-sm font-medium text-red-500">
              {submitError}
            </p>
          )}

          <section className="mt-6 flex w-full items-center justify-center gap-3 sm:gap-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => handlePagination('prev')}
              className="cursor-pointer gap-2 px-6 py-3 text-sm text-custom-text-muted/70 hover:bg-transparent hover:text-custom-text-main"
              disabled={currPage === 1}
            >
              <LuChevronLeft className="size-4" />
              GO BACK
            </Button>
            {currPage !== 5 ? (
              <Button
                type="button"
                onClick={() => handlePagination('next')}
                className="cursor-pointer bg-custom-primary gap-2 rounded-full px-10 py-3.5 text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90"
              >
                NEXT STEP
                <LuChevronRight className="size-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                className="cursor-pointer bg-custom-primary gap-2 rounded-full px-10 py-3.5 text-sm font-medium tracking-wide text-white transition-opacity hover:opacity-90"
              >
                CREATE USER
                <TiUserAdd className="size-4" />
              </Button>
            )}
          </section>
        </Carousel>
      </main>
    </>
  );
}
