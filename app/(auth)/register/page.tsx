import { BsCheckCircleFill } from 'react-icons/bs';
import { CiAt } from 'react-icons/ci';
import { FaRegCircle } from 'react-icons/fa';
import { IoIosLock } from 'react-icons/io';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
import { Progress } from '@/components/ui/progress';

import { Badge } from '@/components/ui/badge';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { IoMdMale } from 'react-icons/io';
import { IoMdFemale } from 'react-icons/io';
import { FaRulerHorizontal } from 'react-icons/fa';
import { GoCircle } from 'react-icons/go';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { FaDumbbell } from 'react-icons/fa6';
import { PiSpeedometerFill } from 'react-icons/pi';
import { MdBolt } from 'react-icons/md';
import { GiMeditation } from 'react-icons/gi';

import { Rubik } from 'next/font/google';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
});

export default function RegisterPage() {
  return (
    <>
      <Progress
        value={20}
        className="bg-primary [&>div]:bg-custom-primary rounded-none"
      />

      <section className="bg-primary p flex flex-1 flex-col">
        <Carousel className="flex w-full flex-1 flex-col justify-between p-4 text-white">
          <CarouselContent className="flex gap-10 p-4">
            {/* Step 1: Account Creation */}
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
                  <FieldLabel className="text-custom-text-muted/60 font-normal">
                    EMAIL ADDRESS
                  </FieldLabel>
                  <InputGroup className="border-custom-text-muted/40 rounded-none border-b">
                    <InputGroupInput
                      type="email"
                      placeholder="example@email.com"
                      className="placeholder:text-custom-text-muted/20"
                    />
                    <InputGroupAddon align="inline-end">
                      <CiAt className="text-custom-secondary" />
                    </InputGroupAddon>
                  </InputGroup>

                  <FieldLabel className="text-custom-text-muted/60 mt-4 font-normal">
                    PASSWORD
                  </FieldLabel>
                  <InputGroup className="border-custom-text-muted/40 rounded-none border-b">
                    <InputGroupInput
                      type="password"
                      placeholder="•••••••"
                      className="placeholder:text-custom-text-muted/20"
                    />
                    <InputGroupAddon align="inline-end">
                      <IoIosLock className="text-custom-secondary" />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              </form>
              {/* Password Requirements */}
              <section className="text-custom-text-muted my-10 flex items-center justify-center gap-6 text-xs">
                <span className="flex items-center gap-2">
                  <BsCheckCircleFill
                    size={15}
                    className="text-custom-secondary"
                  />
                  8+ CHARACTERS
                </span>
                <span className="flex items-center gap-2">
                  <FaRegCircle
                    size={15}
                    className="text-custom-text-muted/30"
                  />
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
                    <FieldLabel className="text-custom-text-muted/60 font-normal">
                      FULL NAME
                    </FieldLabel>
                    <InputGroup className="border-custom-text-muted/40 rounded-none border-b">
                      <InputGroupInput
                        type="text"
                        placeholder="e.g. Alex Rivera"
                        className="placeholder:text-custom-text-muted/20"
                      />
                    </InputGroup>
                    <FieldLabel className="text-custom-text-muted/60 mt-4 font-normal">
                      AGE
                    </FieldLabel>
                    <InputGroup className="border-custom-text-muted/40 rounded-none border-b">
                      <InputGroupInput
                        type="number"
                        placeholder="24"
                        className="placeholder:text-custom-text-muted/20 [appearance:textfield] duration-250 ease-in [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <InputGroupAddon
                        align="inline-end"
                        className="text-custom-text-muted/40"
                      >
                        YEARS
                      </InputGroupAddon>
                    </InputGroup>
                    <RadioGroup className="flex flex-row flex-wrap">
                      <FieldLegend className="text-custom-text-muted/60 mt-4 w-full font-normal">
                        BIOLOGICAL GENDER
                      </FieldLegend>
                      <FieldLabel className="bg-custom-text-muted/5 has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:border-custom-secondary group/radio flex-1 p-2 duration-250 ease-in has-data-[state=checked]:border-4 has-data-[state=unchecked]:border-transparent">
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
                      <FieldLabel className="bg-custom-text-muted/5 has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:border-custom-secondary group/radio flex-1 p-2 duration-250 ease-in has-data-[state=checked]:border-4 has-data-[state=unchecked]:border-transparent">
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
                      <FieldLabel className="bg-custom-text-muted/5 group/radio has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:border-custom-secondary flex-1 p-2 duration-250 ease-in has-data-[state=checked]:border-4 has-data-[state=unchecked]:border-transparent">
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
                  </Field>
                </form>
              </section>
            </CarouselItem>
            <CarouselItem>
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
                        className="placeholder:text-custom-text-muted/20 [appearance:textfield] duration-250 ease-in [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <InputGroupAddon align="inline-end">CM</InputGroupAddon>
                    </InputGroup>
                    <FieldLabel className="text-custom-text-muted/60">
                      BODY MASS
                    </FieldLabel>
                    <InputGroup className="border-custom-text-muted/40 rounded-none border-b">
                      <InputGroupInput
                        type="number"
                        placeholder="00.0"
                        className="placeholder:text-custom-text-muted/20 [appearance:textfield] duration-250 ease-in [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <InputGroupAddon align="inline-end">KG</InputGroupAddon>
                    </InputGroup>
                  </Field>
                </form>
                <Badge className="bg-custom-card-bg flex items-start gap-2 rounded-lg p-4 whitespace-normal">
                  <span className="size-fit pt-1">
                    <IoMdInformationCircleOutline size={20} />
                  </span>
                  <p className="text-custom-text-muted">
                    <span className="text-custom-text-main h-fit text-lg">
                      Calibration Note
                    </span>
                    <br />
                    These values will calibrate your initial calorie expenditure
                    algorithms. You can update these anytime in your dashboard
                    as your body composition evolves.
                  </p>
                </Badge>
              </section>
            </CarouselItem>
            <CarouselItem>
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
                  <RadioGroup className="grid grid-cols-2">
                    <FieldLabel className="bg-custom-text-muted/5 group/radio has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:border-custom-secondary flex-1 p-2 duration-250 ease-in has-data-[state=checked]:border-4 has-data-[state=unchecked]:border-transparent">
                      <Field>
                        <FieldContent className="grid place-items-center gap-3">
                          <FieldTitle className="bg-custom-text-muted/20 group-has-data-[state=checked]/radio:bg-custom-secondary group-has-data-[state=checked]/radio:text-custom-text-main text-custom-text-muted mr-auto rounded-sm p-2 duration-300 ease-in">
                            <FaDumbbell className="text-2xl" />
                          </FieldTitle>
                          <FieldDescription className="mr-auto font-medium">
                            <span className="text-custom-text-muted text-lg">
                              Muscle Gain
                            </span>{' '}
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
                    <FieldLabel className="bg-custom-text-muted/5 group/radio has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:border-custom-secondary flex-1 p-2 duration-250 ease-in has-data-[state=checked]:border-4 has-data-[state=unchecked]:border-transparent">
                      <Field>
                        <FieldContent className="grid place-items-center gap-3">
                          <FieldTitle className="bg-custom-text-muted/20 group-has-data-[state=checked]/radio:bg-custom-secondary group-has-data-[state=checked]/radio:text-custom-text-main text-custom-text-muted mr-auto rounded-sm p-2 duration-300 ease-in">
                            <PiSpeedometerFill className="text-2xl" />
                          </FieldTitle>
                          <FieldDescription className="mr-auto font-medium">
                            <span className="text-custom-text-muted text-lg">
                              Weight Loss
                            </span>{' '}
                            <br />
                            <span className="text-xs">METABOLIC FOCUS</span>
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem
                          value="weight_losss"
                          className="hidden"
                        />
                      </Field>
                    </FieldLabel>
                    <FieldLabel className="bg-custom-text-muted/5 group/radio has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:border-custom-secondary flex-1 p-2 has-data-[state=checked]:border-4 has-data-[state=unchecked]:border-transparent">
                      <Field>
                        <FieldContent className="grid place-items-center gap-3">
                          <FieldTitle className="bg-custom-text-muted/20 group-has-data-[state=checked]/radio:bg-custom-secondary group-has-data-[state=checked]/radio:text-custom-text-main text-custom-text-muted mr-auto rounded-sm p-2 duration-300 ease-in">
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
                    <FieldLabel className="bg-custom-text-muted/5 group/radio has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:border-custom-secondary flex-1 p-2 has-data-[state=checked]:border-4 has-data-[state=unchecked]:border-transparent">
                      <Field>
                        <FieldContent className="grid place-items-center gap-3">
                          <FieldTitle className="bg-custom-text-muted/20 group-has-data-[state=checked]/radio:bg-custom-secondary group-has-data-[state=checked]/radio:text-custom-text-main text-custom-text-muted mr-auto rounded-sm p-2 duration-300 ease-in">
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
                  <RadioGroup>
                    <FieldLabel className="bg-custom-text-muted/5 has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:border-custom-secondary duration-300 ease-in has-data-[state=checked]:border-4 has-data-[state=unchecked]:border-transparent">
                      <Field>
                        <FieldContent className="flex flex-row items-center">
                          <FieldTitle className="p- flex flex-col gap-0 p-3">
                            <span
                              className={`text-custom-secondary text-2xl font-medium ${rubik.className}`}
                            >
                              0-1
                            </span>
                            <span className="text-custom-text-muted/60 text-xs">
                              YEARS
                            </span>
                          </FieldTitle>
                          <FieldDescription className="flex flex-col">
                            <span className="text-custom-text-muted text-xl">
                              Beginner
                            </span>
                            <span className="text-custom-text-muted/60">
                              Focusing on form and habit building.
                            </span>
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value="beginner" className="hidden" />
                      </Field>
                    </FieldLabel>
                    <FieldLabel className="bg-custom-text-muted/5 has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:border-custom-secondary duration-300 ease-in has-data-[state=checked]:border-4 has-data-[state=unchecked]:border-transparent">
                      <Field>
                        <FieldContent className="flex flex-row items-center">
                          <FieldTitle className="p- flex flex-col gap-0 p-3">
                            <span
                              className={`text-custom-secondary text-2xl font-medium ${rubik.className}`}
                            >
                              1-3
                            </span>
                            <span className="text-custom-text-muted/60 text-xs">
                              YEARS
                            </span>
                          </FieldTitle>
                          <FieldDescription className="flex flex-col">
                            <span className="text-custom-text-muted text-xl">
                              Intermediate
                            </span>
                            <span className="text-custom-text-muted/60">
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
                    <FieldLabel className="bg-custom-text-muted/5 has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:border-custom-secondary duration-300 ease-in has-data-[state=checked]:border-4 has-data-[state=unchecked]:border-transparent">
                      <Field>
                        <FieldContent className="flex flex-row items-center">
                          <FieldTitle className="p- flex flex-col gap-0 p-3">
                            <span
                              className={`text-custom-secondary text-2xl font-medium ${rubik.className}`}
                            >
                              3+
                            </span>
                            <span className="text-custom-text-muted/60 text-xs">
                              YEARS
                            </span>
                          </FieldTitle>
                          <FieldDescription className="flex flex-col">
                            <span className="text-custom-text-muted text-xl">
                              Advanced
                            </span>
                            <span className="text-custom-text-muted/60">
                              Consistently training with specific.
                            </span>
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value="advanced" className="hidden" />
                      </Field>
                    </FieldLabel>
                  </RadioGroup>
                </form>
              </section>
            </CarouselItem>
          </CarouselContent>
          {/* Navigation */}
          <section className="mt-6 flex justify-center gap-4">
            <CarouselPrevious
              variant="default"
              size={null}
              className="static flex translate-y-0 gap-2 p-4 font-normal"
            />
            <CarouselNext
              variant="default"
              size={null}
              className="bg-custom-primary static flex translate-y-0 gap-2 p-4 px-5 font-normal"
            />
          </section>
        </Carousel>

        <p className="text-custom-text-muted/40 mb-8 text-center text-xs">
          STEP 1 of 5
        </p>
      </section>
    </>
  );
}
