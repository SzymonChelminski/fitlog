import { Progress } from '@/components/ui/progress';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';

import { CiAt } from 'react-icons/ci';
import { IoIosLock } from 'react-icons/io';

export default function page() {
  return (
    <section className="bg-primary flex-1">
      <Progress
        value={80}
        className="[&>div]:bg-custom-primary rounded-none rounded-r-lg bg-transparent"
      />
      <Carousel className="m-auto h-full w-full p-4 text-white">
        <CarouselContent>
          <CarouselItem className="flex w-full flex-col items-center justify-center">
            <section className="flex flex-col items-center">
              <h1 className="text-center text-[2.5rem] font-extralight">
                Create Account
              </h1>
              <h2 className="text-custom-text-muted text-center text-sm">
                Begin your performance tracking journey
              </h2>
            </section>
            <form>
              <Field>
                <FieldLabel>EMAIL ADDRESS</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    type="mail"
                    placeholder="example@email.com"
                  />
                  <InputGroupAddon align="inline-end">
                    <CiAt />
                  </InputGroupAddon>
                </InputGroup>
                {/* <FieldDescription></FieldDescription> */}
                <FieldLabel>EMAIL ADDRESS</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    type="password"
                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  />
                  <InputGroupAddon align="inline-end">
                    <IoIosLock />
                  </InputGroupAddon>
                </InputGroup>
                {/* <FieldDescription></FieldDescription> */}
              </Field>
            </form>
          </CarouselItem>
          <CarouselItem>2</CarouselItem>
          <CarouselItem>3</CarouselItem>
        </CarouselContent>
        <section>
          {/* <CarouselPrevious className="static translate-y-0" variant="ghost" /> */}
          <CarouselNext className="static translate-y-0" variant="default">
            NEXT STEP
          </CarouselNext>
        </section>
      </Carousel>
    </section>
  );
}
