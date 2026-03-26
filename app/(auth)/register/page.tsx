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
import { Field, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Progress } from '@/components/ui/progress';

export default function RegisterPage() {
  return (
    <>
      <Progress
        value={20}
        className="bg-primary [&>div]:bg-custom-primary rounded-none"
      />

      <section className="bg-primary p flex flex-1 flex-col">
        <Carousel className="flex w-full flex-1 flex-col justify-between p-4 text-white">
          <CarouselContent className="flex p-4">
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

            <CarouselItem>2</CarouselItem>
            <CarouselItem>3</CarouselItem>
          </CarouselContent>

          {/* Navigation */}
          <section className="flex justify-center gap-4">
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
