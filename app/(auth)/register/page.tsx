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

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { IoMdMale } from 'react-icons/io';
import { IoMdFemale } from 'react-icons/io';
import { GoCircle } from 'react-icons/go';

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
                      <FieldLabel className="bg-custom-text-muted/5 has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:border-custom-secondary/60 flex-1 p-2 duration-250 ease-in has-data-[state=checked]:border has-data-[state=unchecked]:border-transparent">
                        <Field>
                          <FieldContent className="grid place-items-center gap-2">
                            <FieldTitle>
                              <IoMdMale className="text-custom-text-muted text-xl" />
                            </FieldTitle>
                            <FieldDescription className="font-medium">
                              MALE
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem value="male" className="hidden" />
                        </Field>
                      </FieldLabel>
                      <FieldLabel className="bg-custom-text-muted/5 has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:border-custom-secondary/60 flex-1 p-2 duration-250 ease-in has-data-[state=checked]:border has-data-[state=unchecked]:border-transparent">
                        <Field>
                          <FieldContent className="grid place-items-center gap-2">
                            <FieldTitle>
                              <IoMdFemale className="text-custom-text-muted text-xl" />
                            </FieldTitle>
                            <FieldDescription className="font-medium">
                              FEMALE
                            </FieldDescription>
                          </FieldContent>
                          <RadioGroupItem value="female" className="hidden" />
                        </Field>
                      </FieldLabel>
                      <FieldLabel className="bg-custom-text-muted/5 has-data-[state=checked]:bg-custom-text-muted/10 has-data-[state=checked]:border-custom-secondary/60 flex-1 p-2 has-data-[state=checked]:border has-data-[state=unchecked]:border-transparent">
                        <Field>
                          <FieldContent className="grid place-items-center gap-2">
                            <FieldTitle>
                              <FaRegCircle className="text-custom-text-muted text-xl" />
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
            <CarouselItem>3</CarouselItem>
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
